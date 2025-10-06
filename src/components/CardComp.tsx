import type { TCard } from "../types/card.types"
import styles from "./CardComp.module.css"

export type TCardProps = {
  clickProp: () => void    // parent-provided function, does nothing for now
  card: TCard               // the card data
}

const CardComp = ({ clickProp, card }: TCardProps) => {
  const handleClick = () => {
    console.log("clicked", card) // <-- matches screenshot behavior
    clickProp()                  // call the parent stub
  }

  // NOTE: we are NOT toggling any "flipped" class in this step
  return (
    <article onClick={handleClick} className={styles.card} aria-label={card.name}>
      <img src={`/imgs/${card.image}`} alt={card.name} />
    </article>
  )
}

export default CardComp
