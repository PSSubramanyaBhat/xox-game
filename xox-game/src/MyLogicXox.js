import './TicTacToe.css';

import React, { useState } from 'react';

const Square = ({ value, handleClick }) => {
    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = ({ board, handleClick }) => {
    function renderSquare(i) {
        return <Square value={board[i]} handleClick={() => handleClick(i)} />;
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
    const handleClick = (i) => {
        console.log(`square ${i} is clicked`);
        
        const board = history[step];
        if (board[i] === null && !computeWinner(board)) {
            
            const newBoard = [...board];
            newBoard[i] = player;
            setPlayer(player === 'X' ? 'O' : 'X');
            const newHistory = history.concat([newBoard]);
            
            setHistory(newHistory);
            setCounter(tic => tic + 1);
            setStep((prevStep) => prevStep + 1);
        }
    };

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [step, setStep] = useState(0);
    const [player, setPlayer] = useState('X');
    let [count, setCounter] = useState(0);


    function computeWinner(board) {
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

    
    // function status() {
    //     const winner = computeWinner(history[step]);
    //     if (winner) {
    //         return 'Winner is ' + winner;
    //     } else if (count === 9 && !winner) {
    //         return 'The Game is a DRAW';
    //     } else {
    //         return `Next player: ${player}`;
    //     }
    // }

    const winner = computeWinner(history[step]);
    let status;
    if (winner) {
        status = 'Winner is ' + winner;
    } else {
        status = `The Next player: ${player}`;
    }
    if (count === 9 && !winner) {
        status = 'The Game is a DRAW';
    }

    


    const jumpToState = (step) => {
        setStep(step);
    };

    // const board = history[step];
    // console.log(board);
    
    return (
        <div>
            <div className="game">
                <div className="status">{status}</div>
                <div className="game-board">
                    <Board board={history[step]} handleClick={handleClick} />
                </div>
            </div>
            <br></br>
            {/* <div>{status}</div> */}
            <br></br>
            <button class="counterButton"
                onClick={() => {
                    if (step > 0) {
                        jumpToState(step-1);
                    }
                }}
            >
            -
            </button>

            <h1>{step}</h1>
            <button class="counterButton"
                onClick={() => {
                    if (step < count) {
                        jumpToState(step+1);
                    }
                }}
            >
            +
            </button>
        </div>
    );
};

export default Game;