import './TicTacToe.css';

import React, { useRef, useEffect, useReducer, useState } from 'react';
import { readFromStorage, writeToStorage } from './LocalStorage';
import { useLocalStorageState } from './useLocalStorageState';

import useTicTacToe from './useTicTacToe2';

import Button from './Button';

import cn from 'classnames';

// const BOARD_VALUE = 'boardValue';
// const STEP = 'step';
// const MOVE_COUNTER = 'moveCounter';
// const PLAYER1 = 'player1';
// const PLAYER2 = 'player2';
// const CURRENT_PLAYER = 'currentPlayer';
// const COLOR1 = 'color1';
// const COLOR2 = 'color2';

const Square = ({ value, handleClick, resultBox, toHighlight }) => {

    const classNameValue = cn("square", { squareWin: toHighlight });
    return (
        <button id={`index-${resultBox}`} className={classNameValue} onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = ({ board, handleClick, winningLineCondition }) => {
    function renderSquare(i) {
        return <Square resultBox={i} value={board[i]} handleClick={() => handleClick(i)}
            toHighlight={winningLineCondition && winningLineCondition.includes(i)}

        />;
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

    const { history, step, setStep, player, resetGame, computeWinner, processCurrentStepAtIndex } = useTicTacToe();


    const handleClick = (i) => {
        console.log(`square ${i} is clicked`);

        processCurrentStepAtIndex(i);
    };



    // const [color1, setcolor1] = useState(() => readFromStorage(COLOR1) || '#eba420');
    // const [color2, setcolor2] = useState(() => readFromStorage(COLOR2) || '#1250c4');


    // const board = history[step];
    // const winningPlayer = computeWinner(board);


    function status() {
        //Check if there is a winner, if so, please show the status that there is a winner,
        //and game should end.
        //We can actually derive if there is a winner. We dont need to maintain a seperate state
        //for this.
        const [winner] = computeWinner(history[step]);
        if (winner === null) {
            if (step === 9)
                //We have filled all the board, this must be a draw
                return 'Game is drawn!';

            return `Next player: ${player}`;
        } else {
            return `Player ${winner} won!`;
        }
    }


    // const winner = winningPlayer.winner;
    // function status() {
    //     if (winner) {
    //         return `Player ${winner} won!`;
    //     } else if (winner === null) {
    //         return 'Its a DRAW game';
    //     } else {
    //         return `Next player: ${winner}`;
    //     }
    // }


    function renderHistory() {
        return history.map((b, index) => (
            <li key={index}>
                <Button selected={index === step} onClick={() => setStep(index)}>
                    {index === 0 ? 'Go to start of the game' : `Goto step${index}`}
                </Button>
            </li>
        ));
    }

    const firstPlayerNameFieldRef = useRef(null);
    console.log(firstPlayerNameFieldRef.current);
    useEffect(() => {
        console.log(firstPlayerNameFieldRef.current);
        if (firstPlayerNameFieldRef.current) {
            firstPlayerNameFieldRef.current.focus();
        }
    }, []);

    const [, winnerLine] = computeWinner(history[step]);

    // const board = history[step];
    return (
        <div className="game">
            <div class="PlayerInput">
                <form>
                    <label>P1:</label>
                    <br></br>
                    <input
                        ref={firstPlayerNameFieldRef}
                        id="symbol1" placeholder="X"
                        onChange={(event) => {
                            // dispatch(setPlayerX(event.target.value));
                            // dispatch(setCurrentPlayer(event.target.value))
                        }}
                    >

                    </input>
                </form>
                <br></br>
                <form>
                    <label>P2:</label>
                    <br></br>
                    <input id="symbol2" placeholder="O"
                        onChange={(event) => {
                            // if (playerX === event.target.value) {
                            //     alert('Player already taken');
                            // } else {
                            //     dispatch(setPlayerY(event.target.value));
                            // }
                        }}
                    >

                    </input>
                </form>
                <button class="ResetButton"
                    selected={false}
                    onClick={() => {
                        resetGame();
                    }}
                >
                    Reset
                </button>
            </div>
            <div class="BoardDisplay">
                <div className="game-board">
                    <Board board={history[step]} handleClick={handleClick} winningLineCondition={winnerLine} />
                </div>
                <div class="Result">{status()}</div>
            </div>
            <div class="StepDisplay">
                <ol class="History">{renderHistory()}</ol>
            </div>
        </div>
    );
};

export default Game;



// TASKS Pending......
/*
1.) Color X and O respectively keeping Local storage in mind as well...
2.) For Input Symbols use useEffect like sir...
3.) History stores, but if u give new user icon and refresh then it will reset to X and O...
    So we gotta write write and Read from Local Storage for each of player1 and 2
    --> DONE... in my method of RESET...
4.) Delete and reduce unnecessary code snippets
5.) Learn and useReduce to do the same problem
6.) learn back useState, useEffect and useRef and prepare for Objects concepts and custom Tags + React fxns (Modern react concepts) ,
    custom Hooks etc.
7.) Dont accept null inputs.  --> DONE... in my method of RESET...
*/