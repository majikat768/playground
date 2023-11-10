export default function Cell({ x, y, value, onCellClick, win }) {
    function handleClick() {
        console.log('clicked ' + value);
    }
    return <button
        className="cell"
        onClick={() => onCellClick(x,y)}
        disabled={value !== null && !win}
    >
        {value}
    </button>
}