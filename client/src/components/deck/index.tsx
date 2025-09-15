import { SERVER_URL } from "../../../config"
import styles from './styles.module.css'
interface deckProps {
    onClick?: () => void
}

const Deck: React.FC = () => {
    return (
        <div className={styles.cardBack}>
            <img className={styles.image} src={`${SERVER_URL}/cards/p.png`}></img>
        </div>
    )
}

export default Deck