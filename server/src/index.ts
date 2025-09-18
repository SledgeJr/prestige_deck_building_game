import express from 'express'
import cors from 'cors'
// import { pool } from '../models/db'
import cardRoutes from './routes/card'
import path from 'path'

const app = express()
app.use(cors(), express.json())

// Allow serving of card images
app.use('/images', express.static(path.join(__dirname, 'images')))

// Example route
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

app.use('/api', cardRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

import { Server } from "socket.io";
import fs from 'fs'

const io = new Server(3001, { cors: { origin: "*" } });

console.log('multiplayer server on port ', 3001)

const filePath = path.join(__dirname, './data/cards.json')
const rawData = fs.readFileSync(filePath, 'utf-8')
const cards = JSON.parse(rawData)

const cardTypes: string[] = Object.keys(cards)

type CardType = typeof cardTypes[number]

type Card = {
  id: string
  type: CardType
}

type GameState = {
  players: string[];
  moves: string[];
  cardsInPlay: Card[]
};

const rooms: Record<string, GameState> = {};

io.on("connection", socket => {
  console.log("Player connected:", socket.id);

  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = { players: [], moves: [], cardsInPlay: [] };
    }
    rooms[roomId].players.push(socket.id);

    io.to(roomId).emit("stateUpdate", rooms[roomId]);
  });

  socket.on("makeMove", ({ roomId, move }) => {
    const room = rooms[roomId];
    if (!room) return;

    room.moves.push(move);

    // Broadcast updated state to all players in the room
    io.to(roomId).emit("stateUpdate", room);
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
  });
});