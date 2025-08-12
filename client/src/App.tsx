import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardFetcher from './components/CardFetcher'
import './App.css'
import { Express } from 'express'

function App() {
  const server_url = "http://localhost:4000"
  const [count, setCount] = useState(0)

  return (
    <>
      <CardFetcher></CardFetcher>
    </>
  )
}

export default App
