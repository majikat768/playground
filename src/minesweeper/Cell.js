export function Cell({ x, y, onCellClick }) {
    let mine = false;
    return <div
        className="cell"
        onClick={() => onCellClick(x, y)}
    ></div>
}