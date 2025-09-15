import styles from './styles.module.css'
import { CardProps } from './types'
import { useState, useEffect } from 'react'

const Card: React.FC<CardProps> = ({ title, image, description, ability_text, prestige, cost, onClick }) => {
  const [intitalMousePosition, setInitialMousePosition] = useState<{[key: string]: number}>({'x': 0, 'y': 0})
  const [currentMousePosition, setCurrentMousePosition] = useState<{[key: string]: number}>({'x': 0, 'y': 0})
  const [positionOffset, setPositionOffset] = useState<{[key: string]: number}>({'x': 0, 'y': 0})
  const [isDragged, setIsDragged] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCurrentMousePosition({
        x: event.clientX, // horizontal position in viewport
        y: event.clientY, // vertical position in viewport
      });
    };

    const handleMouseUp = (event: MouseEvent) => {
      setIsDragged(false)
    }

    window.addEventListener("mouseup", handleMouseUp)

    window.addEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (isDragged) 
    {
      setPositionOffset({'x': currentMousePosition.x-intitalMousePosition['x'], 'y': currentMousePosition.y-intitalMousePosition['y']})
    }
  }, [currentMousePosition])

  useEffect(() => {
    if (!isDragged) 
    {
      setPositionOffset({'x': 0, 'y': 0})
      try{
        document.body.classList.remove(styles.dragging)
      }
      catch{}
    }
  }, [isDragged])


  function handleDragStart(e: React.MouseEvent<HTMLDivElement>) {
    setInitialMousePosition({'x': e.clientX, 'y': e.clientY});
    document.body.classList.add(styles.dragging)
    setIsDragged(true);
    console.log('mouse down')
  };

  function handleDragEnd(e: React.MouseEvent<HTMLDivElement>) {
    setIsDragged(false);
  };

  return (
      <div onMouseDown={handleDragStart} onMouseUp={handleDragEnd} className={styles.cardFrame} style={{transform: `translate(${positionOffset.x/1.5}px, ${positionOffset.y/1.5}px)`}}>
        <div className={styles.card}>
          {prestige && <div className={styles.prestige}>{prestige}</div>}
          {cost && <div className={styles.cost}>{cost}</div>}
          <h3 className={styles.title}>{title}</h3>
          <img src={image} alt={title} className={styles.image} />
          {ability_text && <h4 className={styles.ability} style={{ whiteSpace: 'pre-line' }}>{ability_text}</h4>}
          {description && <h5 className={styles.description}>{description}</h5>}
        </div>
      </div>
  )
}

export default Card