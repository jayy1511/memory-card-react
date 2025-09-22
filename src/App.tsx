import CardComp from "./components/CardComp"
import cards from "./data/cards.json"
import { useState } from "react"

const [gameCards, setGameCards] = useState(cards)

const App = () => {
  // logging the data to the console
  console.log(cards)

  return (
    <div className="main_section">
      <h1>Memory Game</h1>
      <div className="card_container">
        {cards.map((card) => {
          return <CardComp key={card.id} />
        })}
      </div>
    </div>
  )
}

export default App