import './TicTacToe.css';

import React, { useState } from 'react';

const Square = ({ value, turn, handleClick }) => {
    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = () => {

    let boxLeft = 0;
    let winner = 0;
    let end = 0;
    let [playerName, setPlayerName] =useState('X');



    const [turn, setTurn] = useState(1);
    // let [winner, setWinner] = useState(0);
    // let [winnerStatement, declareWinner] = useState('');

    function handleClick(i) {
        const boards = board.slice();
        if (end!==1){
            if (turn === 1) {
                boards[i] = 'X';
                setTurn(2);
                setPlayerName('O');
            } else {
                boards[i] = 'O';
                setTurn(1);
                setPlayerName('X');
            }
            setBoard(boards);
        } else {
            return;
        }
        // console.log(boards, board);
    }

    function checkWinner() {
        for (let i of board) {
            if (i === null) {
                boxLeft = 1;
            }
        }

        if ((board[0] === 'X' && board[1] === 'X' && board[2] === 'X') ||
            (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') ||
            (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') ||
            (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') ||
            (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') ||
            (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') ||
            (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') ||
            (board[2] === 'X' && board[4] === 'X' && board[6] === 'X')) {
            winner = 1;
            end = 1;
            // setWinner(1);
            // declareWinner("Player 1 is the winner");
            // console.log(winnerStatement);
            console.log("Player 1 is the winner");
            return;
            // console.log(winnerStatement);

        } else if ((board[0] === 'O' && board[1] === 'O' && board[2] === 'O') ||
            (board[3] === 'O' && board[4] === 'O' && board[5] === 'O') ||
            (board[6] === 'O' && board[7] === 'O' && board[8] === 'O') ||
            (board[0] === 'O' && board[3] === 'O' && board[6] === 'O') ||
            (board[1] === 'O' && board[4] === 'O' && board[7] === 'O') ||
            (board[2] === 'O' && board[5] === 'O' && board[8] === 'O') ||
            (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') ||
            (board[2] === 'O' && board[4] === 'O' && board[6] === 'O')) {
            winner = 2;
            end = 1;
            result = ''
            console.log("Player 1 is the winner");
            return;

        } else if (boxLeft === 1 && winner === 0) {
            console.log("Game is in Progress");
        } else {
            console.log("Its a DRAW");
            end = 1;
            return;
        }

        // console.log(winnerStatement);
    }

    function renderSquare(i) {
        return <Square value={board[i]} turn={turn} handleClick={() => {
            handleClick(i);
            checkWinner();
        }} />;
    }

    const [board, setBoard] = useState(Array(9).fill(null));





    // const status = 'Next player: X';
    const status = 'Next player: '+playerName;
    const result = '';

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
            <div className="result">{result}</div>
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
