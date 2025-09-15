import { Router } from 'express'
import path from 'path'
import fs from 'fs'

const router = Router()

router.get('/card', (req, res) => {
  const filePath = path.join(__dirname, '../data/cards.json')
  const rawData = fs.readFileSync(filePath, 'utf-8')
  const cards = JSON.parse(rawData)
  const cardType = req.query.cardType as string | undefined;
  if (cardType)
  {
    res.json(cards[cardType])
  }

  const card_types = Object.values(cards)
  const randomCard = card_types[Math.floor(Math.random() * Object.values(card_types).length)]
  res.json(randomCard)
})

export default router