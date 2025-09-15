import { useEffect, useState } from 'react'
import Card from '../card'
import { SERVER_URL } from '../../../config';

interface Card_interface {
  title: string
  image: string
}

interface CardFetcherProps {
  cardType?: string // optional string
}

const CardFetcher: React.FC<CardFetcherProps> = ({cardType}) => {
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
    <Card {...card}></Card>
  )
}

export default CardFetcher