import express, {Application, Request, Response} from 'express'
import dotenv from 'dotenv'
import {Song} from './utils/db/mongoose'

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000
app.use(express.json())

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
  const song = await Song.findByIdAndUpdate(id , { title, artist, album, genre }, { new: true }).exec()

  res.status(200).json(song)
})


// delete song
app.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await Song.findByIdAndDelete(id).exec()

  res.status(200).send('Deleted successfully')
})

// Start listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
