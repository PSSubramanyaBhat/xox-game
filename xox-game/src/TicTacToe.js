import './TicTacToe.css';
import React, { useState } from 'react';

const Square = ({ value, handleClick }) => {
    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = ({ squares, handleClick }) => {

    function renderSquare(i) {
        return <Square value={squares[i]} handleClick={() => {
            handleClick(i);
        }} />;
    }

    return (
        <div>
            <div className="board-row">
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
    let end = 0;
    let [count, setCounter] = useState(0);
    const [boardHistory, setBoardHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xnextTurn, setTurn] = useState(true);

    function handleClick(i) {
        const gotoPoint = boardHistory.slice(0, stepNumber + 1);
        const current = gotoPoint[stepNumber];
        const squares = [...current];

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xnextTurn ? 'X' : 'O';
        setBoardHistory([...gotoPoint, squares]);
        setStepNumber(gotoPoint.length);
        setTurn(!xnextTurn);
        setCounter(tic => tic + 1);
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

    const jumpTo = (step) => {
        setStepNumber(step);
        setTurn((step % 2) === 0);
    };
    const renderMoves =
        boardHistory.map((_step, move) => {
            const destination = move ? "Go to move" + move : "Go to Start";
            return (
                <li key={move}>
                    <button class="historyBtn" onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            );
        });

    let current = boardHistory[stepNumber]
    const winner = calculateWinner(current);
    let status;
    if (winner) {
        status = 'Winner is ' + winner;
        end = 1;
    } else {
        status = 'Next player: ' + (xnextTurn ? 'X' : 'O');
    }

    if (count === 9 && end === 0) {
        status = 'The Game is a DRAW';
    }

    return (

        <div>
            <div className="game">
                <div className="status">{status}</div>
                <div className="game-board">
                    <Board squares={current} handleClick={i => handleClick(i)} />
                </div>
                <ol class="game-info">{renderMoves}</ol>
            </div>
        </div>
    );
};

export default Game;