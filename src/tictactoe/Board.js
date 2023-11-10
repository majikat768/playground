import Cell from "./Cell";
import { useState } from "react";

export default function Board() {
    const [nextPlayer, setNextPlayer] = useState("X");
    const [status,setStatus] = useState("Playing: " + nextPlayer);
    const [squares, setSquares] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const [win, setWin] = useState(false);
    const board = [];

    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push(
                <Cell
                    key={i + "," + j}
                    value={squares[i][j]}
                    x={i}
                    y={j}
                    onCellClick={handleClick}
                    win={win}
                />
            )
        }
        board.push(<div className="row" key={i}>{row}</div>);
    }

    function handleClick(i, j) {
        if(win) {
            return;
        }
        const nextSquares = squares.slice();
        if (nextSquares[i][j] != null) {
            return;
        }
        nextSquares[i][j] = nextPlayer;
        setSquares(nextSquares);
        console.log("win: " + calculateWinner());
        let winner = calculateWinner();
        if(winner != null) {
            setStatus("Winner: " + winner);
            setWin(true);
            return;
        }
        let next = nextPlayer === "X" ? "O" : "X";
        setNextPlayer(next);
        setStatus("Playing: " + next);
    }

    function calculateWinner() {
        for (let i = 0; i < 3; i++) {
            if (squares[i][0] != null) {
                // row
                if (squares[i][0] === squares[i][1] && squares[i][1] === squares[i][2]) {
                    return squares[i][0];
                }
            }
            if (squares[0][i] != null) {
                // col
                if (squares[0][i] === squares[1][i] && squares[1][i] === squares[2][i]) {
                    return squares[0][i];
                }
            }
        }
        // diags
        if (squares[0][0] != null) {
            if (squares[0][0] === squares[1][1] && squares[1][1] === squares[2][2]) {
                return squares[0][0];
            }
        }
        if (squares[0][2] != null) {
            if (squares[0][2] === squares[1][1] && squares[1][1] === squares[2][0]) {
                return squares[0][2];
            }
        }
        return null;
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board">
                {board}
            </div>
        </>
    )
}