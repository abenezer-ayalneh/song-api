import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';
import {Song} from "./utils/db/mongoose";

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post('/create', async (req: Request, res: Response) => {
  // console.log({body: req.body})
  const { title, artist, album, genre } = req.body

  const song = new Song({
    title,
    artist,
    album,
    genre,
  })
  await song.save()

  res.send('Song created')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
