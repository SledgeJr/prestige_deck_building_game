import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardFetcher from './components/CardFetcher'
import CardHand from './components/cardHand'
import './App.css'

import { Express } from 'express'
import Card from 'components/card'

function App() {
  const server_url = "http://localhost:4000"
  const [count, setCount] = useState(0)

  const card_types = ['gold', 'knight', 'wench']
  return (
    // <div className='hand'>
    //   <CardHand cards={card_types}></CardHand>
    // </div>
    <>
      <CardFetcher cardType='gold'></CardFetcher>
      <CardFetcher cardType='knight'></CardFetcher>
      <CardFetcher cardType='wench'></CardFetcher>
    </>
  )
}

export default App
