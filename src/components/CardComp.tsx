import type { TCard } from "../types/card.types"
import styles from "./CardComp.module.css"

export type TCardProps = {
  clickProp: (card: TCard) => void   // parent handler expects a card
  card: TCard
}

const CardComp = ({ clickProp, card }: TCardProps) => {
  const handleClick = () => {
    console.log("clicked", card)     // matches your screenshot
    clickProp(card)                  // send the card to App
  }

  // Add a dynamic class when flipped is true
  const cls = `${styles.card} ${card.flipped ? styles["animate__rotate"] : ""}`

  return (
    <article onClick={handleClick} className={cls} aria-label={card.name}>
      {/* image lives in /public/imgs */}
      <img src={`/imgs/${card.image}`} alt={card.name} />
    </article>
  )
}

export default CardComp
