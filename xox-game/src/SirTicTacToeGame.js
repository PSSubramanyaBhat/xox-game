import './TicTacToe.css';

import React, { useState } from 'react';

import cn from 'classnames';

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
    let end = 0;
    const handleClick = (i) => {
        console.log(`square ${i} is clicked`);
        //We need to record this interaction in the board state
        //1. The square got fresh tap
        //2. The square already had a value associated, in other words, board[i] had a non null value

        if (step !== moveCounter) {
            return;
        }

        if (board[i] === null && !computeWinner(board)) {
            //Set board state to a new state depending who is the current player
            //We need to derive the right board for the given step
            const newBoard = [...board]; //Note, we have to create a new state object, and never mutate the current state and set it back. React wont come to know any state change in this case and there will be no re rendering that is going to happen
            newBoard[i] = player;
            //Flip the player
            setPlayer(player === 'X' ? 'O' : 'X');
            //Set the board state

            const newHistory = history.concat([newBoard]);
            setHistory(newHistory);
            //Update the step
            setStep((prevStep) => prevStep + 1);
            setMoveCounter((x) => x + 1);
            console.log(end);
            console.log(moveCounter);
        }
    };

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [step, setStep] = useState(0);
    const [player, setPlayer] = useState('X');
    const [moveCounter, setMoveCounter] = useState(0);

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

    function status() {
        //Check if there is a winner, if so, please show the status that there is a winner,
        //and game should end.
        //We can actually derive if there is a winner. We dont need to maintain a seperate state
        //for this.
        const winner = computeWinner(history[step]);
        if (winner === null) {
            return `Next player: ${player}`;
        } else if (moveCounter === 9 && end === 0) {
            return 'The Game is a DRAW';
        } else {
            end = 1;
            return `Player ${winner} won!`;
        }


    }

    const jumpToState = (step) => {
        setStep(step);
    };

    function renderHistory() {


        return history.map((b, index) => (
            // <li key={index}>{index === 0 ? 'Go to start of the game' : `Goto step${index}`}</li>
            <li key={index}>
                <button class={cn('historyBtn', { historyButtonSelected: index === step })}
                    onClick={() => {
                        jumpToState(index);
                    }}
                >
                    {index === 0 ? 'Go to start of the game' : `Goto step${index}`}
                </button>
            </li>
        ));
    }

    const board = history[step];
    return (
        <div className="game">
            <div className="game-board">
                <Board board={history[step]} handleClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{status()}</div>
                <ol>{renderHistory()}</ol>
            </div>
        </div>
    );
};

export default Game;