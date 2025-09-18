import { useEffect, useState } from 'react'
import CardFetcher from './components/CardFetcher'
import CardHand from './components/cardHand'
import './App.css'
import Deck from './components/deck'
import PlayArea from './components/playArea'
import { Card, CardType, CardLocation, getRandomType } from './components/card/types'
import PlayerHud from './components/playerHud'
import { SERVER_URL } from '../config'
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App({ roomId }: { roomId: string }) {
  const [cardsInHand, setCardsInHand] = useState<Card[]>([])
  const [numOfOpponentCardsInHand, setNumOfOpponentCardsInHand] = useState<number>(3)
  const [cardsInPlay, setCardsInPlay] = useState<Card[]>([])
  const [opponentCardsInPlay, setOpponentCardsInPlay] = useState<Card[]>([])
  const [playerStats, setPlayerStats] = useState<{gold: number, health: number, defense: number}>({gold: 0, health: 10, defense: 0})
  const [opponentStats, setOpponentStats] = useState<{gold: number, health: number, defense: number}>({gold: 0, health: 10, defense: 0})
  

  const onDeckClick = () => {
    if (cardsInHand.length <= 6){
      const newCard: Card = {id: crypto.randomUUID(), type: getRandomType()}
      setCardsInHand(prevCards => [...prevCards, newCard])
    }
  }

  const cardDragged = (cardID: string | null, mouseX: number, mouseY: number) => {
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
            const params = new URLSearchParams({"cardType": movedCard.type});
            fetch(SERVER_URL+`/api/card${params ? `?${params}` : ''}`)
              .then(res => res.json())
              .then(data => setPlayerStats({
                health: playerStats.health + data.play_effect.health,
                gold: playerStats.gold + data.play_effect.gold,
                defense: playerStats.defense + data.play_effect.defense
              }))
            .catch(console.error)
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
    <div className='opponentHand'>
      {Array.from({ length: numOfOpponentCardsInHand }).map((_, index) => (
        <div className='opponentCard' key={index} >
        <Deck />
        </div>
      ))}
    </div>
    <div id='playArea' className='playArea'>
      <PlayArea cards={cardsInPlay}
        key={cardsInPlay.map(c => c.id).join('-')}></PlayArea>
    </div>
    <div id='playerHud' className='playerHud'>
      <PlayerHud name="Player" gold={playerStats.gold} health={playerStats.health} defense={playerStats.defense}></PlayerHud>
    </div>
    <div id='opponentPlayArea' className='playArea'>
      <PlayArea cards={opponentCardsInPlay}
        key={cardsInPlay.map(c => c.id).join('-')}></PlayArea>
    </div>
    <div id='opponentHud' className='playerHud'>
      <PlayerHud name="Opponent" gold={opponentStats.gold} health={opponentStats.health} defense={opponentStats.defense}></PlayerHud>
    </div>
    </>
  )
}

export default App
