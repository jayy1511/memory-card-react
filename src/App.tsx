import { useEffect, useState } from "react"
import CardComp from "./components/CardComp"
import ModalComp from "./components/ModalComp"
import type { TCard, TCardList } from "./types/card.types"
import cards from "./data/cards.json"

const createGameCards = (): TCardList => {
  const pairs = (cards as TCard[]).flatMap((card) => [
    { ...card, id: card.id },
    { ...card, id: card.id + 100 },
  ])
  return pairs
}

const shuffleCards = (arr: TCardList): TCardList => {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function App() {
  const [gameCards, setGameCards] = useState<TCardList>(() =>
    shuffleCards(createGameCards())
  )
  const [flippedCards, setFlippedCards] = useState<TCard["name"][]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const handleCardClick = (clickedCard: TCard) => {
    if (clickedCard.matched) return
    if (clickedCard.flipped) return
    if (flippedCards.length === 2) return

    setGameCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, flipped: true } : card
      )
    )
    setFlippedCards((prev) => [...prev, clickedCard.name])
  }

  useEffect(() => {
    if (flippedCards.length !== 2) return

    setMoves((prev) => prev + 1)
    const [firstName, secondName] = flippedCards

    if (firstName === secondName) {
      const nextMatches = matches + 1
      setMatches(nextMatches)
      setGameCards((prev) =>
        prev.map((card) =>
          card.name === firstName ? { ...card, matched: true } : card
        )
      )
      setFlippedCards([])
      if (nextMatches === gameCards.length / 2) {
        setGameOver(true)
      }
    } else {
      const t = setTimeout(() => {
        setGameCards((prev) =>
          prev.map((card) =>
            flippedCards.some((n) => n === card.name)
              ? { ...card, flipped: false }
              : card
          )
        )
        setFlippedCards([])
      }, 1000)
      return () => clearTimeout(t)
    }
  }, [flippedCards])

  const toggleModal = (show: boolean) => {
    setGameOver(show)
    if (!show) {
      setMoves(0)
      setMatches(0)
      setFlippedCards([])
      setGameCards(shuffleCards(createGameCards()))
    }
  }

  return (
    <div className="main_section">
      <h1>Memory Game</h1>
      <p>Number of moves: {moves}</p>
      <div className="card_container">
        {gameCards.map((card) => (
          <CardComp key={card.id} card={card} clickProp={handleCardClick} />
        ))}
      </div>
      <ModalComp showModal={gameOver} toggleModal={toggleModal} />
    </div>
  )
}
