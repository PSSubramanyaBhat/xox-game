import './TicTacToe.css';

import React, { useState } from 'react';

import cn from 'classnames';

const Square = ({ value, handleClick, resultBox }) => {
    return (
        // <button id="" className={cn('square', { squareWin: false })} onClick={handleClick}>
        //     {value}
        // </button>

        <button id={`index-${resultBox}`} className="square" onClick={handleClick}>
            {value}
        </button>

        // if (index === lines2[i][0] || index === lines2[i][1] || index === lines2[i][2] )
    );
};

const Board = ({ board, handleClick }) => {
    function renderSquare(i) {
        return <Square resultBox={i} value={board[i]} handleClick={() => handleClick(i)} />;
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
    let focusClassName1 = "";
    let focusClassName2 = "";
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

            for (let j = 0; j < 8; j++) {
                if (j % 2 === 0) {
                    document.getElementById(`index-${j}`).style.color = '#eba420'//"#42ee84";
                } else {
                    document.getElementById(`index-${j}`).style.color = '#1250c4'//"#42ee84";
                }
            }
            //Flip the player
            // setPlayer(player === 'X' ? 'O' : 'X');
            setPlayer(player === player1 ? player2 : player1);
            //Set the board state

            const newHistory = history.concat([newBoard]);
            setHistory(newHistory);
            //Update the step
            setStep((prevStep) => prevStep + 1);
            setMoveCounter((x) => x + 1);
            setCounter(tic => tic + 1);
        }
    };

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [step, setStep] = useState(0);
    // const [player, setPlayer] = useState('X');
    const [moveCounter, setMoveCounter] = useState(0);
    const [count, setCounter] = useState(0);
    const [player1, setIcon1] = useState('X');
    const [player2, setIcon2] = useState('O');
    // const [player1, setIcon1] = useState(document.getElementById("symbol1").value);
    // const [player2, setIcon2] = useState(document.getElementById("symbol2").value);
    const [player, setPlayer] = useState(player1);

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
                console.log("venbkbb");
                // console.log(a);
                // console.log(b);
                // console.log(c);
                console.log(board);
                // console.log(board[a]);
                console.log(lines[i]);
                console.log(lines[i][0]);
                console.log(lines[i][1]);
                console.log(lines[i][2]);

                // document.getElementById(`index-${lines[i]}`).style.background = "#ff0";
                console.log(board[a]);
                console.log(board);
                console.log(board.length);

                //highlighting code...
                for (let j = 0; j < lines[i].length; j++) {
                    document.getElementById(`index-${lines[i][j]}`).style.background = '#80e4a6'//"#42ee84";
                }

                return board[a];
                // return { 'player': board[a], 'board': [a, b, c] };   //another approach...
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
        /*
        if (winner === null) {
            return `Next player: ${player}`;
        } else if (moveCounter === 9 && end === 0) {
            return 'The Game is a DRAW';
        } else {
            end = 1;
            return `Player ${winner} won!`;
        }
        */

        if (winner) {
            end = 1;
            return `Player ${winner} won!`;
        } else if (count === 9 && end === 0) {
            return 'Its a DRAW game';
        } else {
            return `Next player: ${player}`;
        }
    }

    const jumpToState = (step) => {
        setStep(step);
        if (step !== moveCounter) {
            for (let j = 0; j < 8; j++) {
                document.getElementById(`index-${j}`).style.background = '#fff'//"#42ee84";
            }
        }
        
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
            <div class="PlayerInput">
                <form>
                    <label>P1:</label>
                    <br></br>
                    <input id="symbol1" placeholder="X"
                        onChange={(event) => {
                            setIcon1(event.target.value);
                            setPlayer(player1);
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
                            setIcon2(event.target.value);
                        }}
                    >

                    </input>
                </form>
                <button class="ResetButton"
                    onClick={() => {
                        end = 0;
                        document.getElementById("symbol1").value = '';
                        document.getElementById("symbol2").value = '';
                        setIcon1('X');
                        setPlayer(player1);
                        setIcon2('O');
                        setMoveCounter(0);
                        setCounter(0);
                        setStep(0);
                        setHistory([Array(9).fill(null)]);
                        for (let i = 0; i < 9; i++) {
                            document.getElementById(`index-${i}`).style.background = '#fff'//"#42ee84";
                        }
                    }}
                >
                    Reset
                </button>
                <button class="PlayButton"
                    onClick={() => {
                        let len1 = document.getElementById("symbol1").value.length;
                        let len2 = document.getElementById("symbol2").value.length;
                        if (len1 === 1 && len2 === 1) {
                            setIcon1(document.getElementById("symbol1").value); //Want to resolve thte issue of using this statement twice...
                            setPlayer(player1);
                        } else if (len1 === 0 && len2 === 0) {
                            setIcon1('X'); //Want to resolve thte issue of using this statement twice...
                            setIcon2('O');
                            setPlayer(player1);
                        } else {
                            alert("Enter a single character");
                            document.getElementById("symbol1").value = '';
                            document.getElementById("symbol2").value = '';
                        }

                    }}
                >
                    Play
                </button>
            </div>
            <div class="BoardDisplay">
                <div className="game-board">
                    <Board board={history[step]} handleClick={handleClick} />
                </div>
                <div class="Result">{status()}</div>
            </div>
            <div class="StepDisplay">
                <ol class="History">{renderHistory()}</ol>
            </div>
            {/* <div class="Result">{status()}</div> */}
            {/* <ol class="History">{renderHistory()}</ol> */}
        </div>
    );
};

export default Game;