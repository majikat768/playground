import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <div className="navBar">
            <div className="link">
                <Link to="/playground/">Home</Link>
            </div>
            <div className="link">
                <Link to="/playground/tictactoe">Tic Tac Toe</Link>
            </div>
            <div className="link">
                <Link to="/playground/minesweeper">Minesweeper</Link>
            </div>
        </div>
    )
}