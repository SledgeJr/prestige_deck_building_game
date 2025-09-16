import { useState } from 'react'
import CardFetcher from './components/CardFetcher'
import CardHand from './components/cardHand'
import './App.css'
import Deck from './components/deck'
import PlayArea from './components/playArea'
import { Card, CardType, CardLocation, getRandomType } from './components/card/types'


function App() {
  const [cardsInHand, setCardsInHand] = useState<Card[]>([])
  const [cardsInPlay, setCardsInPlay] = useState<Card[]>([])
  const onDeckClick = () => {
    if (cardsInHand.length <= 6){
      const newCard: Card = {id: crypto.randomUUID(), type: getRandomType()}
      setCardsInHand(prevCards => [...prevCards, newCard])
    }
  }

  const cardDragged = (cardID: string | null, mouseX: number|null, mouseY: number|null) => {
    const playArea = document.getElementById('playArea')
    if (playArea) {
      const rect = playArea.getBoundingClientRect()
      if (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
      )
      {
        if (cardID) {
          const movedCard = cardsInHand.find(card => card.id === cardID);
          setCardsInHand(prev => prev.filter(card => card.id !== cardID));
          if (movedCard) {
            setCardsInPlay(prev => [...prev, movedCard]);
          }
        }
      }  
    }

  }

  return (
    <>    
    <div className='deck'>
      <Deck onClick={onDeckClick}></Deck>
    </div>
    <div className='hand'>
      <CardHand
        cards={cardsInHand}
        onDragged={cardDragged}
        key={cardsInHand.map(c => c.id).join('-')}></CardHand>
    </div>
    <div id='playArea' className='playArea'>
      <PlayArea cards={cardsInPlay}
        key={cardsInPlay.map(c => c.id).join('-')}></PlayArea>
    </div>
    </>
  )
}

export default App
