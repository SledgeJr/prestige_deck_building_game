import CardFetcher from "../CardFetcher";
import styles from './styles.module.css';
import {useState} from 'react';
import { Card } from '../card/types'

interface CardHandProps {
    cards: Card[]
    onDragged: (id: string|null, mouseX: number|null, mouseY: number|null) => void
}


const CardHand: React.FC<CardHandProps> = ({ cards, onDragged }) => {

  
  return (
  <div className={styles.cardHand}>
    {cards.map((card, i) => (
      <div key={i} className={styles.cardInHand} style={{translate: `${i*-30}%`}}>
        <CardFetcher isDraggable={true} onDragged={onDragged} id={card.id} cardType={card.type}></CardFetcher>
      </div>
    ))}
  </div>
  )
};

export default CardHand
