import express from 'express'
import cors from 'cors'
// import { pool } from '../models/db'
import cardRoutes from './routes/card'
import path from 'path'

const app = express()
app.use(cors(), express.json())

// Allow serving of card images
app.use('/cards', express.static(path.join(__dirname, 'images')))

// Example route
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

app.use('/api', cardRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)