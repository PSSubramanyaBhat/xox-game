import './TicTacToe.css';

import React, { useState } from 'react';

const Square = ({ value, handleClick }) => {
    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = () => {
    function renderSquare(i) {
        return <Square index={i} />;
    }

    const [board, setBoard] = useState(Array(9).fill(null));

    const status = 'Next player: X';

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(board[0])}
                {renderSquare(board[1])}
                {renderSquare(board[2])}
            </div>
            <div className="board-row">
                {renderSquare(board[3])}
                {renderSquare(board[4])}
                {renderSquare(board[5])}
            </div>
            <div className="board-row">
                {renderSquare(board[6])}
                {renderSquare(board[7])}
                {renderSquare(board[8])}
            </div>
        </div>
    );
};

const Game = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
};

export default Game;