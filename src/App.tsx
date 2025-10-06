import { useState } from "react"
import CardComp from "./components/CardComp"
import type { TCard, TCardList } from "./types/card.types"
import cards from "./data/cards.json"

const App = () => {
  // 1) React state: the single source of truth for the cards on screen
  const [gameCards, setGameCards] = useState<TCardList>(cards as TCardList)

  // 2) Called when a card is clicked. It flips exactly that card.
  const handleCardClick = (clickedCard: TCard) => {
    // Map returns a NEW array (immutability) so React re-renders.
    setGameCards(prev =>
      prev.map(card =>
        card.id === clickedCard.id
          ? { ...card, flipped: !card.flipped } // toggle flipped
          : card
      )
    )
  }

  return (
    <div className="main_section">
      <h1>Memory Game</h1>

      <div className="card_container">
        {gameCards.map((card: TCard) => (
          // 3) We now pass the real click handler (not an empty fn)
          <CardComp key={card.id} card={card} clickProp={handleCardClick} />
        ))}
      </div>
    </div>
  )
}

export default App
