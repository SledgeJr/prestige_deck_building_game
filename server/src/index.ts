import express from 'express'
import cors from 'cors'
import { pool } from './models/db'

const app = express()
app.use(cors(), express.json())

// Example route
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)