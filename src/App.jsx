import { useState } from "react"
import GameBoard from "./GameBoard"
import Player from "./Player"
import Log from "./Log";

function App() {
  const [activePlayer,setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns]=useState([]);

  function handleActivePlayer(rowIdx,colIdx) {
    setActivePlayer((activePlayer)  => (activePlayer === 'X') ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';

      if(prevTurns.length>0 && prevTurns[0].player==='X')
        currentPlayer = 'O';
      const updatedTurns = [
        {square:{row : rowIdx, col: colIdx}, player : currentPlayer},...prevTurns
      ];
      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive = {activePlayer==='X'}/>
          <Player name="Player 2" symbol="O" isActive = {activePlayer==='O'}/>
        </ol>
        <GameBoard  onSelectHandle = {handleActivePlayer} turns = {gameTurns} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
