import "./minesweeper.css";
import { useEffect, useState } from "react";
import { Cell } from "./Cell";

export function Minesweeper() {

    const cols = 12;
    const rows = 8;
    const n_mines = 10;
    var mines_left = n_mines;

    const [cells, setCells] = useState(init_cells(cols, rows));
    const [cellsLeft, setCellsLeft] = useState((cols*rows)-n_mines);
    const [gameover, setGameover] = useState(false);
    const [status,setStatus] = useState(null);

    function restart() {
        setCells(init_cells(cols,rows));
        mines_left = n_mines;
        setCellsLeft((cols*rows)-n_mines);
        setGameover(false);
        setStatus(null);
    }
    function init_cells(cols, rows) {
        let cells = [];
        for (let i = 0; i < cols; i++) {
            cells.push([]);
            for (let j = 0; j < rows; j++) {
                cells[i].push({
                    'mine': false,
                    'clicked': false,
                    'flagged': false,
                    'neighbors': 0,
                    'label': null
                });
            }
        }
        let mines_set = 0;
        while (mines_set < n_mines) {
            let x = Math.floor(Math.random() * cols);
            let y = Math.floor(Math.random() * rows);
            if (!cells[x][y].mine) {
                cells[x][y].mine = true;
                mines_set += 1;
            }
        }
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                cells[i][j].neighbors = get_neighbors(cells, i, j);
            }
        }
        return cells;
    }

    let board = [];
    for (let i = 0; i < cells.length; i++) {
        let row = [];
        for (let j = 0; j < cells[0].length; j++) {
            let cell = <Cell
                key={i + ',' + j}
                x={i}
                y={j}
                neighbors={cells[i][j].neighbors}
                clicked={cells[i][j].clicked}
                flagged={cells[i][j].flagged}
                mine={cells[i][j].mine}
                label={cells[i][j].label}
                onCellClick={handleClick}
            ></Cell>
            row.push(cell);
        }
        board.push(<div className="row" key={i}>{row}</div>);
    }

    return <div className="minesweeper">
    <div className="status">{status}</div>
        <div className={gameover ? "board gameover" : "board"}>
            {board}
        </div>
        <button
        onClick={restart}
        >restart</button>
    </div>

    function handleClick(e, x, y) {
        e.preventDefault();
        if(gameover) {
            return;
        }
        console.log(e.type);
        let newCells = cells.slice();
        if (e.type == 'contextmenu') {
            if (newCells[x][y].flagged) {
                newCells[x][y].label = null;
                newCells[x][y].flagged = false;
                newCells[x][y].clicked = false;
            } else {
                newCells[x][y].label = "🚩";
                newCells[x][y].flagged = true;
                newCells[x][y].clicked = true;
            }
        }
        else if (e.type == 'click') {
            if (!newCells[x][y].clicked && !newCells[x][y].flagged) {
                newCells = reveal(newCells, x,y);

            }
        }
        setCells(newCells);
        let left = 0;
        for(let i = 0; i < cells.length; i++) {
            for(let j = 0; j < cells[0].length; j++) {
                if(!cells[i][j].clicked && !cells[i][j].mine) {
                    left += 1;
                }
            }
        }
        setCellsLeft(left);
        if(left == 0) {
            console.log('win');
            setStatus("win!");
            setGameover(true);
        }
    }

    function reveal(newCells, x, y) {
        let c = newCells[x][y];
        c.clicked = true;
        if (c.mine) {
            c.label = "💣";
            setGameover(true);
        } else if(c.neighbors > 0) {
            c.label = c.neighbors;
        } else if(c.neighbors == 0) {
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 1; j++) {
                    let n_x = x+i;
                    let n_y = y+j;
                    if(n_x >= 0 && n_x < cols && n_y >= 0 && n_y < rows) {
                        let c_n = newCells[n_x][n_y];
                        if(!c_n.clicked && !c_n.mine) {
                            newCells = reveal(newCells,n_x,n_y);
                        }
                    }
                }
            }
        }
        return newCells;
    }

    function init_mines(cells) {
        let mines_planted = 0;
        while (mines_planted < n_mines) {
            let x = Math.floor(Math.random() * cols);
            let y = Math.floor(Math.random() * rows);
            cells[x][y]['mine'] = true;
            mines_planted += 1;
        }
        return cells;
    }

    function get_neighbors(cells, x, y) {
        let neighbors = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let n_x = x + i;
                let n_y = y + j;
                if (n_x >= 0 && n_x < cols && n_y >= 0 && n_y < rows) {
                    if (n_x != x || n_y != y) {
                        if (cells[n_x][n_y]['mine']) {
                            neighbors += 1;
                        }
                    }
                }
            }
        }

        return neighbors;
    }
}
