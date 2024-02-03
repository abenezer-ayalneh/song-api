import mongoose from 'mongoose'
import dotenv from 'dotenv'

//For env File
dotenv.config()

// Create a connection to DB
mongoose
  .connect(process.env.MONGO_DB_URL ?? 'mongodb://mongo_db_user:mongo_db_password@localhost:27017/song', {
    authSource: 'admin',
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

// Define schema
const Schema = mongoose.Schema
const songSchema = new Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
})

// Create model(s)
const Song = mongoose.model('Song', songSchema)

export { Song }
