import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardFetcher from './components/CardFetcher'
import CardHand from './components/cardHand'
import './App.css'
import {useEffect} from 'react'
import { Express } from 'express'
import Deck from './components/deck'

function App() {

  const card_types = ['gold', 'knight', 'wench']
  return (
    <>    
    <div className='deck'>
      <Deck></Deck>
    </div>
    <div className='hand'>
      <CardHand cards={card_types}></CardHand>
    </div>
    </>
  )
}

export default App
