export interface CardProps {
  title: string
  image: string
  description?: string
  ability_text?: string
  prestige?: string
  cost?: number
  onClick?: () => void
}