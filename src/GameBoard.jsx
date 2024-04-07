const boardValues = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

export default function GameBoard({onSelectHandle,turns}) {
    let board = boardValues;

    for(const turn of turns){
        const {square, player} = turn;
        const {row, col} = square;

        board[row][col] = player;
    }

    // const [board, setBoard] = useState(boardValues);

    // function handleBoardButton(rowIdx,colIdx) {
    //     setBoard((prevBoard) => {
    //         const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];
    //         updatedBoard[rowIdx][colIdx] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectHandle();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectHandle(rowIndex,colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}