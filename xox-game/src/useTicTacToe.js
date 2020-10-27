import React, { useState } from 'react';

import { useLocalStorageState } from './useLocalStorageState';

function useTicTacToe() {
    const [history, setHistory] = useLocalStorageState([Array(9).fill(null)], 'history');
    const [step, setStep] = useLocalStorageState(0, 'step');
    const [player1, setIcons1] = useLocalStorageState('X', 'player1');
    const [player2, setIcons2] = useLocalStorageState('O', 'player2');
    const [player, setPlayer] = useLocalStorageState(player1, 'currentPlayer');

    // function setPlayerIcons() {

    // }

    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setStep(0);
        setPlayer(player1);
        // setPlayer('X');
    }
    
    function alertMessage() {
        setIcons1(player1);
        setIcons2(player2);
        if (player1 === player2) {
            alert("Both players can't have same value");
        }
    }

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
                return [board[a], [a, b, c]];
            }
        }
        return [null, null];
    }

    function processCurrentStepAtIndex(i) {
        const board = history[step];
        const [winner] = computeWinner(board);
        const isStepCurrent = () => step === history.length - 1;
        if (isStepCurrent() && board[i] === null && !winner) {
            //Set board state to a new state depending who is the current player
            //We need to derive the right board for the given step
            const newBoard = [...board]; //Note, we have to create a new state object, and never mutate the current state and set it back. React wont come to know any state change in this case and there will be no re rendering that is going to happen
            newBoard[i] = player;
            //Flip the player
            // setPlayer(player === 'X' ? 'O' : 'X');
            setPlayer(player === player1 ? player2 : player1);
            //Set the board state

            // [initalboard, step1board]
            const newHistory = history.concat([newBoard]);
            setHistory(newHistory);
            //Update the step
            setStep(step + 1);
        }
    }

    return {
        history,
        step,
        player,
        setHistory,
        setStep,
        setPlayer,
        player1,
        player2,
        setIcons1,
        setIcons2,
        alertMessage,
        resetGame,
        computeWinner,
        processCurrentStepAtIndex,
    };
}

export default useTicTacToe;