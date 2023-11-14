import { useState } from "react";

export function Cell({ x, y, neighbors, clicked, mine, flagged, label, onCellClick }) {

    var className = "cell";
    if(clicked) {
        className += " clicked";
        if(mine) {
            className += " mine";
        }
        if(flagged) {
            className += " flagged";
        }
    }
    return <button
        className={className}
        id={"c"+x+"_"+y}
        onClick={
            (e) => {
                onCellClick(e,x,y)
            }
        }
        onContextMenu={
            (e) => {
                onCellClick(e,x,y)
            }
        }
    >{label}</button>

/*
    function flag(e) {
        e.preventDefault();
        if (flagged) {
            setLabel(null);
        } else {
            setLabel("🚩");
        }
    }
    function click(e) {
        if (!clicked) {
            if (neighbors == -1) {
                setLabel("💣");
            } else {
                if (neighbors > 0) {
                    setLabel(neighbors);
                }
                onCellClick(e, x, y);
            }
        }

    }
    */
}