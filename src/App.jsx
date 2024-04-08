import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./WinningCombinations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_BOARD_VALUES = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let board = [...INITIAL_BOARD_VALUES.map(arr => [...arr])];

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      board[row][col] = player;
  }
  return board;
}

function deriveWinner(player,board) {
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstBlockSymbol = board[combination[0].row][combination[0].column];
    const secondBlockSymbol = board[combination[1].row][combination[1].column];
    const thirdBlockSymbol = board[combination[2].row][combination[2].column];

    if(firstBlockSymbol && firstBlockSymbol===secondBlockSymbol && firstBlockSymbol===thirdBlockSymbol)
      winner = player[firstBlockSymbol];
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns]=useState([]);
  const [player,setPlayer] = useState(PLAYERS);

  const board = deriveGameBoard(gameTurns);
  const winner = deriveWinner(player,board);
  const hasDraw = gameTurns.length===9 && !winner;
  const activePlayer = derivedActivePlayer(gameTurns);

  function handleActivePlayer(rowIdx,colIdx) {
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        {square:{row : rowIdx, col: colIdx}, player : currentPlayer},...prevTurns
      ];
      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol,playerName) {
    setPlayer((oldPlayers)=>({...oldPlayers,[symbol]:playerName}));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName={PLAYERS.X} symbol="X" isActive = {activePlayer==='X'} onNameChange = {handlePlayerName}/>
          <Player initName={PLAYERS.O} symbol="O" isActive = {activePlayer==='O'} onNameChange = {handlePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard  onSelectHandle = {handleActivePlayer} board = {board} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
