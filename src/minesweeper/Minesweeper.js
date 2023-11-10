import { useState } from "react";
import "./minesweeper.css";
import { Cell } from "./Cell";

export function Minesweeper() {

    const cols = 10;
    const rows = 10;
    const n_mines = 32;

    const board = init_cells(cols, rows);
    const mines = init_mines(cols, rows, n_mines);

    return <div className="minesweeper">
        <div className="board">
            {board}
        </div>
    </div>

    function handleClick(x,y) {
        console.log(x,y);
        console.log(mines[x][y]);
    }

    function init_cells() {
        const board = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push(
                    <Cell
                        key={i + "," + j}
                        x = {i}
                        y = {j}
                        onCellClick={handleClick}></Cell>
                );
            }
            board.push(<div className="row" key={i}>{row}</div>);
        }

        return board;
    }

    function init_mines() {
        let mines = [];
        for (let i = 0; i < rows; i++) {
            mines.push([]);
            for (let j = 0; j < cols; j++) {
                mines[i].push(0);
            }
        }
        let mines_planted = 0;

        while (mines_planted < n_mines) {
            let x = Math.floor(Math.random() * cols);
            let y = Math.floor(Math.random() * rows);
            mines[x][y] = 1;
            mines_planted += 1;
        }
        console.log(mines);
        return mines;
    }

}
