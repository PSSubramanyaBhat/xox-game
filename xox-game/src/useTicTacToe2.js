import React, { useReducer, useState } from 'react';

import { useLocalStorageState } from './useLocalStorageState';

const SET_PLAYER_X_ACTION_TYPE = 'SET_PLAYER_X';
const SET_PLAYER_Y__ACTION_TYPE = 'SET_PLAYER_Y';
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

//1. Set player X
const setPlayerX = (playerName) => ({
    type: SET_PLAYER_X_ACTION_TYPE,
    playerName,
});

//2. Set Player Y
const setPlayerY = (playerName) => ({
    type: SET_PLAYER_Y__ACTION_TYPE,
    playerName,
});

//3. Reset The game
const resetGameAction = () => ({
    type: RESET_ACTION_TYPE,
    initialState,
});

//4. Play Next Step
const playNextStep = (index) => ({
    type: PLAY_NEXT_STEP_ACTION_TYPE,
    index,
});

//5. Go to a Step
function gotToStep(step) {
    return {
        type: GOTO_STEP_ACTION_TYPE,
        step,
    };
}

function useTicTacToe() {
    const ticTacToeReducer = (state, action) => {
        switch (action.type) {
            case SET_PLAYER_X_ACTION_TYPE:
                return { ...state, playerX: action.playerName };
            case SET_PLAYER_Y__ACTION_TYPE:
                return { ...state, playerY: action.playerName };
            case RESET_ACTION_TYPE:
                return action.initialState;
            case PLAY_NEXT_STEP_ACTION_TYPE:
                return reduceNextStep(state, action.index);
            case GOTO_STEP_ACTION_TYPE:
                if (action.step >= 0 && action.step < 10) {
                    return { ...state, step: action.step };
                } else {
                    throw new Error('Step needs to be within 0 and 10!');
                    return state;
                }

            default:
                return state;
        }
    };

    function reduceNextStep(state, index) {
        // if (index < 0 || index > 8) {
        //     throw new Error('A wrong value for the index is encountered');
        // }

        //Get the most recent history from history, and
        //make a copy of it.
        let { history, step, currentPlayer, playerX, playerY } = state;

        const board = history[step];
        const [winner] = computeWinner(board);
        const isStepCurrent = () => step === history.length - 1;


        //this return state without error if gone to previous states and clicked... But...
        // why crashed if pressed on the same square again?
        
        /* if (!isStepCurrent()) {
            return state;
        } */

        /* if (board[index] === null && !winner) {
            const prevHistory = history[step];
            const newHistory = [...prevHistory];
            newHistory[index] = currentPlayer;

            //Concatenate the history
            history = history.concat([newHistory]);

            //Change the player for the next turn
            currentPlayer = currentPlayer === playerX ? playerY : playerX;
            //Indicate we want to play next step
            step += 1;

            return { ...state, history, step, currentPlayer };
        } */

        
        if (isStepCurrent() && board[index] === null && !winner) {
            const prevHistory = history[step];
            const newHistory = [...prevHistory];
            newHistory[index] = currentPlayer;

            //Concatenate the history
            history = history.concat([newHistory]);

            //Change the player for the next turn
            currentPlayer = currentPlayer === playerX ? playerY : playerX;
            //Indicate we want to play next step
            step += 1;

            return { ...state, history, step, currentPlayer };
        } else {
            return state;
        }
    }

    const [state, dispatch] = useReducer(ticTacToeReducer, initialState);

    function resetGame() {
        dispatch(resetGameAction());
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
        // dispatch(playNextStep(11));
        dispatch(playNextStep(i));
    }

    const history = state.history;
    const step = state.step;
    const player = state.currentPlayer;

    function setStep(nextStep) {
        dispatch(gotToStep(nextStep));
    }

    return {
        history,
        step,
        player,
        setStep,
        resetGame,
        computeWinner,
        processCurrentStepAtIndex,
    };
}

export default useTicTacToe;


/*
TASKS Pending...
1.) Set UserInput players...
2.) LocalStorage even after refresshing...
*/