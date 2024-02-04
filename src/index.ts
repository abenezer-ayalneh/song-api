import express, {Application, Request, Response} from 'express'
import dotenv from 'dotenv'
import {Song} from './utils/db/mongoose'
import cors from 'cors'

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// Create a song
app.post('/create', async (req: Request, res: Response) => {
  const { title, artist, album, genre } = req.body

  const song = new Song({
    title,
    artist,
    album,
    genre,
  })
  await song.save()

  res.status(201).send('Song created')
})

// List songs
app.get('/list', async (req: Request, res: Response) => {
  const songs = await Song.find().exec()

  res.status(200).json(songs)
})

// Update song
app.patch('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, artist, album, genre } = req.body
  const song = await Song.findByIdAndUpdate(id, { title, artist, album, genre }, { new: true }).exec()

  res.status(200).json(song)
})

// delete song
app.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await Song.findByIdAndDelete(id).exec()

  res.status(200).send('Deleted successfully')
})

// Data stats
app.get('/stat', async (req: Request, res: Response) => {
  // Total songs count
  const songsCount = await Song.countDocuments()

  // Total artists count
  const artistsCount = await Song.aggregate()
    .group({ _id: '$artist', total: { $count: {} } })
    .count('total')
    .exec()

  // Total albums count
  const albumsCount = await Song.aggregate()
    .group({ _id: '$album', total: { $count: {} } })
    .count('total')
    .exec()

  // Total genres count
  const genresCount = await Song.aggregate()
    .group({ _id: '$genre', total: { $count: {} } })
    .count('total')
    .exec()

  // Number of songs in every genre
  const songsInEveryGenre = await Song.aggregate()
    .group({ _id: '$genre', songs: { $count: {} } })
    .exec()

  // Number of songs and albums each artist has
  const songsAndAlbumsOfEveryArtist = await Song.aggregate()
    .group({
      _id: '$artist',
      songs: { $count: {} },
      albums: { $addToSet: '$album' },
    })
    .project({ _id: '$_id', songs: '$songs', albums: { $size: '$albums' } })

  // Number of songs on each album
  const numberOfSongsInEachAlbum = await Song.aggregate().group({ _id: '$album', songs: { $count: {} } })

  res.status(200).json({
    totalSongs: songsCount,
    totalArtists: artistsCount[0]['total'],
    totalAlbums: albumsCount[0]['total'],
    totalGenres: genresCount[0]['total'],
    songsInEveryGenre,
    songsAndAlbumsOfEveryArtist,
    numberOfSongsInEachAlbum,
  })
})

// Start listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
