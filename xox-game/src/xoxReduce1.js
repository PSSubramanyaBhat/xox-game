import './TicTacToe2.css';

import React, { useEffect, useRef } from 'react';

import Button from './Button';
import useTicTacToe from './useTicTacToe';

const Square = ({ value, winner, handleClick }) => {
    const classes = `square ${winner ? 'square-winning' : undefined}`;
    return (
        <button className={classes} onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = ({ board, winnerLine, handleClick }) => {
    function renderSquare(i) {
        const winner = (winnerLine && winnerLine.includes(i)) || false;
        return <Square value={board[i]} winner={winner} handleClick={() => handleClick(i)} />;
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
    // const [history, setHistory] = useState([Array(9).fill(null)]);
    // const [step, setStep] = useState(0);
    // const [player, setPlayer] = useState('X');

    const {
        history,
        setHistory,
        step,
        setStep,
        player,
        setPlayer,
        player1,
        player2,
        setIcons1,
        setIcons2,
        alertMessage,
        resetGame,
        computeWinner,
        processCurrentStepAtIndex,
    } = useTicTacToe();

    const handleClick = (i) => {
        console.log(`square ${i} is clicked`);

        processCurrentStepAtIndex(i);
    };

    function status() {
        //Check if there is a winner, if so, please show the status that there is a winner,
        //and game should end.
        //We can actually derive if there is a winner. We dont need to maintain a seperate state
        //for this.

        // const [winner] = computeWinner(history[step]);
        if (winner === null) {
            if (step === 9)
                //We have filled all the board, this must be a draw
                return 'Game is drawn!';

            return `Next player: ${player}`;
        } else {
            return `Player ${winner} won!`;
        }
    }

    function renderHistory() {
        return history.map((b, index) => (
            <li key={index}>
                <Button selected={index === step} onClick={() => setStep(index)}>
                    {index === 0 ? 'Go to start of the game' : `Goto step${index}`}
                </Button>
                {/* class={cn('historyBtn', { historyButtonSelected: index === step })} */}
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

    const [winner, winnerLine] = computeWinner(history[step]);
    return (
        <div className="game">
            <div class="PlayerInput">
                <div className="name-inputs">
                    <label>P1: </label>
                    <input ref={firstPlayerNameFieldRef} type={'text'}
                        onChange={(event) => {
                            if (event.target.value!=='' && event.target.value.length === 1) {
                                setIcons1(event.target.value);
                                setPlayer(event.target.value);
                            } 
                            // else if (alertMessage) {
                            //     alert("Both players can't have same value");
                            // } 
                            else {
                                alert("Enter a single character");
                            }
                            
                        }}
                        placeholder={'X'} />
                    <label>P2: </label>
                    <input type={'text'}
                        onChange={(event) => {
                            if (event.target.value!=='' && event.target.value.length === 1) {
                                setIcons2(event.target.value);
                            } 
                            // else if (alertMessage) {
                            //     alert("Both players can't have same value");
                            // } 
                            else {
                                alert("Enter a single character");
                            }
                        }}
                        placeholder={'O'} />
                </div>
                <div class="leftPad">
                    <Button
                        selected={false}
                        onClick={() => {
                            resetGame();
                        }}
                    >
                        Reset the game
                </Button>
                </div>
            </div>
            <div class="BoardDisplay">
                <div className="game-board">
                    <Board board={history[step]} winnerLine={winnerLine} handleClick={handleClick} />
                    <div class="Result">{status()}</div>
                </div>
            </div>
            <div class="StepDisplay">
                <ol>{renderHistory()}</ol>
            </div>

        </div>
    );
};

export default Game;

// Write condition for input,  for 2 inputs being same, then dont allow...