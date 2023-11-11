import "./minesweeper.css";
import { Cell } from "./Cell";

export function Minesweeper() {

    const cols = 12;
    const rows = 8;
    const n_mines = 6;

    const cells = [];
    const mines = init_mines();
    const board = init_cells();

    return <div className="minesweeper">
        <div className="board">
            {board}
        </div>
    </div>

    function handleClick(e,x,y,mine) {
        e.preventDefault();
        if(get_neighbors(x,y) == 0) {
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 1; j++) {
                    let n_x = x+i;
                    let n_y = y+j;
                    if(n_x != x && n_y != y) {
                        if(n_x >= 0 && n_x < cols && n_y >= 0 && n_y < rows) {
                            if(!cells[n_x][n_y].clicked) {
                            //sendClick(x,y);
                            }
                        }
                    }
                }
            }
        }
    }

    function sendClick(x,y) {
        const events = ['mousedown','click','mouseup'];
        events.forEach((t) => {
            document.querySelector("#c"+x+"_"+y).dispatchEvent(
                new MouseEvent(t, {
                    view:window,
                    bubbles:true,
                    cancelable:true,
                    buttons:1
                })
            )
        })
    }

    function init_cells() {
        const board = [];
        for (let i = 0; i < cols; i++) {
            let row = [];
            cells.push([]);
            for (let j = 0; j < rows; j++) {
                let cell = <Cell
                    key={i + "," + j}
                    x={i}
                    y={j}
                    neighbors={get_neighbors(i,j)}
                    mine={mines[i][j]}
                    onCellClick={handleClick}></Cell>
                cells[i].push(cell);
                row.push(cell);
            }
            board.push(<div className="row" key={i}>{row}</div>);
        }

        init_mines();
        return board;
    }

    function init_mines() {
        let mines = [];
        for (let i = 0; i < cols; i++) {
            mines.push([]);
            for (let j = 0; j < rows; j++) {
                mines[i].push(0);
            }
        }
        let mines_planted = 0;
        while (mines_planted < n_mines) {
            let x = Math.floor(Math.random()*cols);
            let y = Math.floor(Math.random()*rows);
            mines[x][y] = 1;
            mines_planted += 1;
        }
        console.log(mines);
        return mines;
    }

    function get_neighbors(x,y) {
        if(mines[x][y] == 1) {
            return -1;
        }
        let neighbors = 0;

        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                let n_x = x+i;
                let n_y = y+j;
                if(n_x >= 0 && n_x < cols && n_y >= 0 && n_y < rows) {
                    if(n_x != x || n_y != y) {
                        if(mines[n_x][n_y] == 1) {
                            neighbors += 1;
                        }
                    }
                }
            }
        }

        return neighbors;
    }
}
