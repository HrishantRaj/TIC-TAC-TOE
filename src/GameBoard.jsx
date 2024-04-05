import { useState } from "react";

const boardValues = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

export default function GameBoard({onSelectHandle, activePlayerSymbol}) {
    const [board, setBoard] = useState(boardValues);

    function handleBoardButton(rowIdx,colIdx) {
        setBoard((prevBoard) => {
            const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];
            updatedBoard[rowIdx][colIdx] = activePlayerSymbol;
            return updatedBoard;
        });
        onSelectHandle();
    }

    return (
        <ol id="game-board">
            {board.map((row, rowIdx) => (
                <li key={rowIdx}>
                    <ol>
                        {row.map((playerSymbol,colIdx) => (
                            <li key={colIdx}>
                                <button onClick={() => handleBoardButton(rowIdx,colIdx)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}