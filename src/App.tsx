import { useState } from "react"
import CardComp from "./components/CardComp"
import type { TCard, TCardList } from "./types/card.types"
import cards from "./data/cards.json"

const createGameCards = (): TCardList => {
  const pairs = (cards as TCard[]).flatMap((card) => [
    { ...card, id: card.id },          // first copy
    { ...card, id: card.id + 100 },    // second copy (unique id)
  ])
  return pairs
}

const shuffleCards = (arr: TCardList): TCardList => {
  // copy first so we don't mutate the original
  return [...arr].sort(() => Math.random() - 0.5)
}

const App = () => {
  // 1) React state: the single source of truth for the cards on screen
  const [gameCards, setGameCards] = useState<TCardList>(
  shuffleCards(createGameCards())
)

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

    <button
      onClick={() => setGameCards(shuffleCards(createGameCards()))}
      className="new_game_btn"
    >
      🔄 New Game
    </button>

    <div className="card_container">
      {gameCards.map((card: TCard) => (
        <CardComp key={card.id} card={card} clickProp={handleCardClick} />
      ))}
    </div>
  </div>
)
}

export default App
