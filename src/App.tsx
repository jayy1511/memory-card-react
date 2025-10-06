import { useState } from "react"
import CardComp from "./components/CardComp"
import type { TCard, TCardList } from "./types/card.types"
import cards from "./data/cards.json"

const App = () => {
  // read-only state just to render them
  const [gameCards] = useState<TCardList>(cards as TCardList)

  return (
    <div className="main_section">
      <h1>Memory Game</h1>
      <div className="card_container">
        {gameCards.map((card: TCard) => {
          // EXACTLY like your screenshot: pass an empty function
          return <CardComp card={card} clickProp={() => {}} key={card.id} />
        })}
      </div>
    </div>
  )
}

export default App
