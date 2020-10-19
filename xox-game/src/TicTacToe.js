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
    function handleClick(i) {
        const boards = board.slice();
        if (calculateWinner(boards) || boards[i]) {
            return;
        }
        boards[i] = xnextTurn ? 'X' : 'O';
        // boards[i] = 'X';
        setBoard(boards);
        setTurn(!xnextTurn);
    }

    function calculateWinner(board) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              return board[a];
            }
          }
          return null;
    }

    function renderSquare(i) {

        const winner = calculateWinner(board);
        let status;
        if (winner) {
            status = 'Winner; ' + winner;
        } else {
            status = 'Next player: ' + (xnextTurn ? 'X' : 'O');
        }

        return <Square value={board[i]} handleClick={() => {
            handleClick(i);
        }}/>;
    }

    const [board, setBoard] = useState(Array(9).fill(null));
    const [xnextTurn, setTurn] = useState(true);

    const status = 'Next player: ' + (xnextTurn ? 'X' : 'O');

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {/* {renderSquare(board[0])}
                {renderSquare(board[1])}
                {renderSquare(board[2])} */}

                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
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