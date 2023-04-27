import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import corsOptions from "./config/corsOptions.js";
dotenv.config()
const app = express()
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))

app.use('/api/post', postRoutes)
app.use('/api/dalle', dalleRoutes)

app.get('/', async (req, res) => {
  res.send('hello from Picture This AI !!!')
})

console.log(process.env.NODE_ENV);

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL)
    app.listen(8000, () => console.log('server running successfully!!'))
  } catch (error) {
    console.log(error);
  }
}
startServer()