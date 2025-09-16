export const CardTypes = ['gold', 'wench', 'knight']

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
  cost?: number
  onDragged: (id: string|null, mouseX: number|null, mouseY: number|null) => void 
  onClick?: () => void
}