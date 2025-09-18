import { SERVER_URL } from "../../../config"
import styles from './styles.module.css'
interface deckProps {
    onClick?: () => void
}

const Deck: React.FC<deckProps> = ({ onClick }) => {
    return (
        <div className={styles.cardBack} onClick={onClick}>
            <img className={styles.image} src={`${SERVER_URL}/images/p.png`}></img>
        </div>
    )
}

export default Deck