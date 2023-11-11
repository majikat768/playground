import { useState } from "react";

export function Cell({ x, y, mine, neighbors, onCellClick }) {
    const [clicked, setClicked] = useState(false);
    const [flagged, setFlagged] = useState(false);
    const [label, setLabel] = useState(null);

    return <button
        className="cell"
        id={"c"+x+"_"+y}
        disabled={clicked}
        onClick={
            (e) => {
                click(e);
            }
        }
        onContextMenu={
            (e) => {
                if (!clicked) {
                    flag(e);
                }
            }
        }
    >{label}</button>

    function flag(e) {
        e.preventDefault();
        if (flagged) {
            setFlagged(false);
            setLabel(null);
        } else {
            setFlagged(true);
            setLabel("🚩");
        }
    }
    function click(e) {
        if (!clicked) {
            setClicked(true);
            if (neighbors == -1) {
                setLabel("💣");
            } else {
                if (neighbors > 0) {
                    setLabel(neighbors);
                }
                onCellClick(e, x, y, mine);
            }
        }

    }
}