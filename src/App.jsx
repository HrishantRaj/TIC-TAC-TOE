import { useState } from "react"
import GameBoard from "./GameBoard"
import Player from "./Player"

function App() {
  const [activePlayer,setActivePlayer] = useState('X');

  function handleActivePlayer() {
    setActivePlayer((activePlayer)  => (activePlayer === 'X') ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive = {activePlayer==='X'}/>
          <Player name="Player 2" symbol="O" isActive = {activePlayer==='O'}/>
        </ol>
        <GameBoard  onSelectHandle = {handleActivePlayer} activePlayerSymbol={activePlayer} />
      </div>
    </main>
  )
}

export default App
