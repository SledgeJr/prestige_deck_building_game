import CardFetcher from "../CardFetcher";
import styles from './styles.module.css'
import {useState} from 'react'

interface CardHandProps {
    cards: string[]
}


const CardHand: React.FC<CardHandProps> = ({ cards }) => {
  return (
  <div className={styles.cardHand}>
    {cards.map((card, i) => (
      <div key={i} className={styles.cardInHand} style={{transform: `translateX(${i*-30}%)`}}>
        <CardFetcher cardType={card}></CardFetcher>
      </div>
    ))}
  </div>
  )
};

export default CardHand
