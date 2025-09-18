import { SERVER_URL } from "../../../config";

export let CardTypes: string[] = []

fetch(SERVER_URL + `/api/cardTypes`)
  .then(res => res.json())
  .then(data => {
    CardTypes = data;
  })
  .catch(console.error);

export type CardLocation = "deck" | "hand" | "inPlay";

export type CardType = typeof CardTypes[number];

export function getRandomType(): CardType {
  return CardTypes[Math.floor(Math.random() * CardTypes.length)]
}

export type Card = {
  id: string
  type: CardType
}

export interface CardProps {
  id: string
  title: string
  image: string
  isDraggable: boolean
  description?: string
  ability_text?: string
  prestige?: string
  cost?: number,
  onDragged: (id: string|null, mouseX: number, mouseY: number) => void 
  onClick?: () => void
}