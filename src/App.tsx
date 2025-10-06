import { useEffect, useState } from "react"
import CardComp from "./components/CardComp"
import type { TCard, TCardList } from "./types/card.types"
import cards from "./data/cards.json"

// Build pairs
const createGameCards = (): TCardList => {
  const pairs = (cards as TCard[]).flatMap((card) => [
    { ...card, id: card.id },
    { ...card, id: card.id + 100 }, // unique id for the duplicate
  ])
  return pairs
}

// Shuffle helper
const shuffleCards = (arr: TCardList): TCardList => {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function App() {
  // Cards on the board
  const [gameCards, setGameCards] = useState<TCardList>(
    shuffleCards(createGameCards())
  )

  // Names of the two cards currently flipped (unresolved turn)
  //    Type is "name" of TCard so only valid hero names are allowed
  const [flippedCards, setFlippedCards] = useState<TCard["name"][]>([])

  // Click handler: flip, collect name, but respect limits
  const handleCardClick = (clickedCard: TCard) => {
    // do not allow selecting already matched cards
    if (clickedCard.matched) return

    // limit to two selections per turn
    if (flippedCards.length === 2) return

    // optional safety: avoid re-clicking the same face-up card
    if (clickedCard.flipped) return

    // flip the clicked card
    setGameCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, flipped: !card.flipped } : card
      )
    )

    // collect the card "name" for the turn (we'll compare these two)
    setFlippedCards((prev) => [...prev, clickedCard.name])
  }

  // When two names are collected → resolve the turn
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstName, secondName] = flippedCards

      if (firstName === secondName) {
        // MATCH → mark both copies as matched, keep them face-up
        setGameCards((prev) =>
          prev.map((card) =>
            card.name === firstName ? { ...card, matched: true } : card
          )
        )
        setFlippedCards([]) // clear turn, allow next two clicks
      } else {
        // NO MATCH → flip those two back after a short delay
        const t = setTimeout(() => {
          setGameCards((prev) =>
            prev.map((card) =>
              card.name === firstName || card.name === secondName
                ? { ...card, flipped: false }
                : card
            )
          )
          setFlippedCards([]) // clear turn
        }, 800)

        return () => clearTimeout(t)
      }
    }
  }, [flippedCards])

  return (
    <div className="main_section">
      <h1>Memory Game</h1>

      <div className="card_container">
        {gameCards.map((card) => (
          <CardComp key={card.id} card={card} clickProp={handleCardClick} />
        ))}
      </div>
    </div>
  )
}
