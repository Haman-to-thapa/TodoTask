import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

app.use('/tasks',taskRoutes)


app.listen(PORT , () => {
  console.log(`Server running at  http://localhost:${PORT}`)
})