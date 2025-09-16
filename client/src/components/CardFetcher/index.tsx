import { useEffect, useState } from 'react'
import Card from '../card'
import { SERVER_URL } from '../../../config';
import { CardType } from 'components/card/types';

interface Card_interface {
  title: string
  image: string
}

interface CardFetcherProps {
  id: string
  isDraggable: boolean
  cardType?: CardType // optional string
  onDragged: (id: string|null, mouseX: number|null, mouseY: number|null) => void
}

const CardFetcher: React.FC<CardFetcherProps> = ({id, cardType, isDraggable, onDragged}) => {
  const [card, setCard] = useState<Card_interface | null>(null)
  
  let params = null
  if (cardType)
  {
    params = new URLSearchParams({"cardType": cardType});
  }
  

  useEffect(() => {
    fetch(SERVER_URL+`/api/card${params ? `?${params}` : ''}`)
      .then(res => res.json())
      .then(data => setCard({
        ...data,
        image: SERVER_URL + data.image,
      }))
      .catch(console.error)
  }, [])


  if (!card) return <p>Loading card...</p>

  return (
    <Card id={id} isDraggable={isDraggable} onDragged={onDragged} {...card}></Card>
  )
}

export default CardFetcher