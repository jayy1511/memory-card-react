import { useEffect, useState } from "react"
import CardComp from "./components/CardComp"
import type { TCard, TCardList } from "./types/card.types"
import cards from "./data/cards.json"

// Build pairs from the base heroes (ensure unique ids for the duplicates)
const createGameCards = (): TCardList => {
  const pairs = (cards as TCard[]).flatMap((card) => [
    { ...card, id: card.id },         // first copy
    { ...card, id: card.id + 100 },   // second copy with unique id
  ])
  return pairs
}

// Shuffle helper (returns a NEW array)
const shuffleCards = (arr: TCardList): TCardList => {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function App() {
  // The board: 12 cards (6 pairs), shuffled
  const [gameCards, setGameCards] = useState<TCardList>(() =>
    shuffleCards(createGameCards())
  )

  // Track the current turn: up to two *names* of flipped cards
  const [flippedCards, setFlippedCards] = useState<TCard["name"][]>([])

  // Click handler: guards + flip the clicked card + record its name
  const handleCardClick = (clickedCard: TCard) => {
    // ignore already matched, already face-up, or when 2 are already chosen
    if (clickedCard.matched) return
    if (clickedCard.flipped) return
    if (flippedCards.length === 2) return

    // flip only the clicked card
    setGameCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, flipped: true } : card
      )
    )

    // remember the name for this turn
    setFlippedCards((prev) => [...prev, clickedCard.name])
  }

  // When two have been selected, resolve the turn
  useEffect(() => {
    if (flippedCards.length !== 2) return

    const [firstName, secondName] = flippedCards

    if (firstName === secondName) {
      // MATCH → lock both copies as matched (stay face-up)
      setGameCards((prev) =>
        prev.map((card) =>
          card.name === firstName ? { ...card, matched: true } : card
        )
      )
      setFlippedCards([]) // clear for next turn
    } else {
      // NO MATCH → give the player ~1s to see, then flip JUST those two back
      const t = setTimeout(() => {
        setGameCards((prev) =>
          prev.map((card) =>
            flippedCards.some((n) => n === card.name)
              ? { ...card, flipped: false }
              : card
          )
        )
        setFlippedCards([]) // clear for next turn
      }, 1000)

      return () => clearTimeout(t)
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