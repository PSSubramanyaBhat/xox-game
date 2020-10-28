import './TicTacToe.css';

import React, { useReducer, useState } from 'react';
import { readFromStorage, writeToStorage } from './LocalStorage';
import { useLocalStorageState } from './useLocalStorageState';

import Button from './Button';

import cn from 'classnames';

const BOARD_VALUE = 'boardValue';
const STEP = 'step';
const MOVE_COUNTER = 'moveCounter';
const PLAYER1 = 'player1';
const PLAYER2 = 'player2';
const CURRENT_PLAYER = 'currentPlayer';
const COLOR1 = 'color1';
const COLOR2 = 'color2';

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
    const SET_PLAYER_X_ACTION_TYPE = 'SET_PLAYER_X';
    const SET_PLAYER_Y_ACTION_TYPE = 'SET_PLAYER_Y';
    const SET_CURRENT_PLAYER_ACTION_TYPE = 'SET_CURRENT_PLAYER';
    const RESET_ACTION_TYPE = 'RESET';
    const PLAY_NEXT_STEP_ACTION_TYPE = 'PLAY_NEXT_STEP';
    const GOTO_STEP_ACTION_TYPE = 'GO_TO_STEP';

    const initialState = {
        history: [Array(9).fill(null)],
        playerX: 'X',
        playerY: 'Y',
        currentPlayer: 'X',
        step: 0,
        winningLine: [],
    };

    const setPlayerX = (playerName) => ({
        type: SET_PLAYER_X_ACTION_TYPE,
        playerName,
    });

    const setPlayerY = (playerName) => ({
        type: SET_PLAYER_Y_ACTION_TYPE,
        playerName,
    });

    const setCurrentPlayer = (playerName) => ({
        type: SET_CURRENT_PLAYER_ACTION_TYPE,
        playerName,
    });

    const resetGame = () => ({
        type: RESET_ACTION_TYPE,
        initialState,
    });

    const playNextStep = (index) => ({
        type: PLAY_NEXT_STEP_ACTION_TYPE,
        index,
    });

    const gotoStep = (step) => ({
        type: GOTO_STEP_ACTION_TYPE,
        step,
    });

    const ticTacToeReducer = (state, action) => {
        switch (action.type) {
            case SET_PLAYER_X_ACTION_TYPE:
                return { ...state, playerX: action.playerName };
            case SET_PLAYER_Y_ACTION_TYPE:
                return { ...state, playerY: action.playerName };
            case SET_CURRENT_PLAYER_ACTION_TYPE:
                return { ...state, currentPlayer: action.playerName };
            case RESET_ACTION_TYPE:
                return action.initialState;
            case PLAY_NEXT_STEP_ACTION_TYPE:
                return reduceNextStep(state, action.index);
            case GOTO_STEP_ACTION_TYPE:
                if (action.step >= 0 && action.step < 10) {
                    return { ...state, step: action.step };
                } else {
                    throw new Error('Steps needs to be within 0 and 10');
                    // return state;
                }
            default:
                return state;
        }
    };

    function reduceNextStep(state, index) {
        let { history, step, currentPlayer, playerX, playerY } = state;

        const prevHistory = history[step];
        const newHistory = [...prevHistory];
        newHistory[index] = currentPlayer;

        history = history.concat([newHistory]);

        currentPlayer = currentPlayer === playerX ? playerY : playerX;

        step = step + 1;

        return { ...state, history, step, currentPlayer };

    }

    const [state, dispatch] = useReducer(ticTacToeReducer, initialState);

    let { history, step, currentPlayer, playerX, playerY } = state;

    const handleClick = (i) => {
        console.log(`square ${i} is clicked`);

        // if (step !== moveCounter) {
        //     return;
        // }

        if (step !== history.length - 1) {
            return;
        }

        if (board[i] === null && winner === null) {

            if (board[i] === null && winner === null) {
                dispatch(playNextStep(i));
            }

            // setcolor1(color1);
            // setcolor2(color2);

            // writeToStorage(COLOR1, color1);
            // writeToStorage(COLOR2, color2);


            // if (moveCounter % 2 === 0) {
            //     document.getElementById(`index-${i}`).style.color = color1;
            // } else {
            //     document.getElementById(`index-${i}`).style.color = color2;
            // }

        }
    };



    // const [history, setHistory] = useState(() => readFromStorage(BOARD_VALUE) || [Array(9).fill(null)]);
    // const [step, setStep] = useState(() => readFromStorage(STEP) || 0);
    // const [moveCounter, setMoveCounter] = useState(() => readFromStorage(MOVE_COUNTER) || 0);

    // const [player1, setIcon1] = useState(() => readFromStorage(PLAYER1) || 'X');
    // const [player2, setIcon2] = useState(() => readFromStorage(PLAYER2) || 'O');
    // const [player, setPlayer] = useState(() => readFromStorage(CURRENT_PLAYER) || player1);   //PERFECTLY WORKING SNIPPET......


    // const [color1, setcolor1] = useState(() => readFromStorage(COLOR1) || '#eba420');
    // const [color2, setcolor2] = useState(() => readFromStorage(COLOR2) || '#1250c4');

    const board = history[step];
    const winningPlayer = computeWinner(board);

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

                return {
                    winner: board[a],
                    winningLine: lines[i]
                };   //another approach...
            }
        }
        // return null;
        return {
            winner: null,
            winningLine: null,
        };
    }


    const winner = winningPlayer.winner;
    function status() {
        if (winner) {
            return `Player ${winner} won!`;
        } else if (winner === null) {
            return 'Its a DRAW game';
        } else {
            return `Next player: ${winner}`;
        }
    }

    // const jumpToState = (step) => {
    //     setStep(step);
    // };

    function renderHistory() {
        return history.map((b, index) => (

            <li key={index}>
                <Button selected={index === step}
                    onClick={() => dispatch(gotoStep(index))}>
                    {index === 0 ? 'Go to start of the game' : `Goto step ${index}`}
                </Button>
            </li>
        ));
    }

    // const board = history[step];
    return (
        <div className="game">
            <div class="PlayerInput">
                <form>
                    <label>P1:</label>
                    <br></br>
                    <input id="symbol1" placeholder="X"
                        onChange={(event) => {
                            dispatch(setPlayerX(event.target.value));
                            dispatch(setCurrentPlayer(event.target.value))
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
                            if (playerX === event.target.value) {
                                alert('Player already taken');
                            } else {
                                dispatch(setPlayerY(event.target.value));
                            }
                        }}
                    >

                    </input>
                </form>
                <button class="ResetButton"
                    onClick={() => {
                        // document.getElementById("symbol1").value = '';
                        // document.getElementById("symbol2").value = '';
                        // setIcon1('X');
                        // setPlayer(player1);
                        // setIcon2('O');
                        // setMoveCounter(0);
                        // setStep(0);
                        // setHistory([Array(9).fill(null)]);
                        dispatch(resetGame());
                    }}
                >
                    Reset
                </button>
                {/* <button class="PlayButton"
                    onClick={() => {
                        let len1 = document.getElementById("symbol1").value.length;
                        let len2 = document.getElementById("symbol2").value.length;

                        let name1 = document.getElementById("symbol1").value;
                        let name2 = document.getElementById("symbol2").value;
                        if (len1 === 1 && len2 === 1) {
                            setIcon1(document.getElementById("symbol1").value); //Want to resolve thte issue of using this statement twice...
                            // writeToStorage(PLAYER1,player1);
                            writeToStorage(PLAYER1, document.getElementById("symbol1").value);
                            setPlayer(player1);
                        } else if (len1 === 0 && len2 === 0) {
                            setIcon1('X'); //Want to resolve thte issue of using this statement twice...
                            setIcon2('O');
                            writeToStorage(PLAYER1, 'X');
                            writeToStorage(PLAYER2, 'O');
                            setPlayer(player1);
                        } else {
                            alert("Enter a single character");
                            document.getElementById("symbol1").value = '';
                            document.getElementById("symbol2").value = '';
                        }

                        if ((name1 !== '' && name2 !== '') && name1 === name2) {
                            alert("2 players cant have same name");
                            document.getElementById("symbol1").value = '';
                            document.getElementById("symbol2").value = '';
                        }

                    }}
                >
                    Play
                </button> */}
            </div>
            <div class="BoardDisplay">
                <div className="game-board">
                    <Board board={history[step]} handleClick={handleClick} winningLineCondition={winningPlayer.winningLine} />
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