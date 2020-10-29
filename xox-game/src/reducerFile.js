// //An inner working of useReducer hook can be expressed something like this.
// //You supply an initial state, and another function called as reduce function
// // Reduce function is a function which will be used to manipulate the state maintained by
// //the reducer. The reducer function summarises how the state change is happening in one
// //place.

// function useReducer(initialState, reduceFunction) {
//     let innerState = initialState;
//     let reduce = reduceFunction;

//     function dispatch(action) {
//         innerState = reduce(innerState, action);
//     }

//     function state() {
//         return innerState;
//     }
//     return [state, dispatch];
// }

// const SET_PLAYER_X_ACTION_TYPE = 'SET_PLAYER_X';
// const SET_PLAYER_Y__ACTION_TYPE = 'SET_PLAYER_Y';
// const RESET_ACTION_TYPE = 'RESET';
// const PLAY_NEXT_STEP_ACTION_TYPE = 'PLAY_NEXT_STEP';
// const GOTO_STEP_ACTION_TYPE = 'GO_TO_STEP';

// //1. Set player X
// const setPlayerX = (playerName) => ({
//     type: SET_PLAYER_X_ACTION_TYPE,
//     playerName,
// });

// //2. Set Player Y
// const setPlayerY = (playerName) => {
//     type: SET_PLAYER_Y__ACTION_TYPE, playerName;
// };

// //3. Reset The game
// const resetGame = () => {
//     type: RESET_ACTION_TYPE, initialState;
// };

// //4. Play Next Step
// const playNextStep = (index) => {
//     type: PLAY_NEXT_STEP_ACTION_TYPE, index;
// };

// //5. Go to a Step
// const gotToStep = (step) => {
//     type: 'GO_TO_STEP', step;
// };

// const ticTacToeReducer = (state, action) => {
//     switch (action.type) {
//         case SET_PLAYER_X_ACTION_TYPE:
//             return { ...state, playerX: action.playerName };
//         case SET_PLAYER_Y__ACTION_TYPE:
//             return { ...state, playerY: action.playerName };
//         case RESET_ACTION_TYPE:
//             return action.initialState;
//         case PLAY_NEXT_STEP_ACTION_TYPE:
//             return reduceNextStep(state, action.index);
//         case GOTO_STEP_ACTION_TYPE:
//             if (action.step >= 0 && action.step < 10) {
//                 return { ...state, step: action.step };
//             } else {
//                 throw new Error('Step needs to be within 0 and 10!');
//                 return state;
//             }

//         default:
//             return state;
//     }
// };

// function reduceNextStep(state, index) {
//     //Get the most recent history from history, and
//     //make a copy of it.
//     let { history, step, currentPlayer, playerX, playerY } = state;
//     const prevHistory = history[step];
//     const newHistory = [...prevHistory];
//     newHistory[index] = currentPlayer;

//     //Concatenate the history
//     history = history.concat(newHistory);

//     //Change the player for the next turn
//     currentPlayer = currentPlayer === playerX ? playerY : playerX;
//     //Indicate we want to play next step
//     step += 1;

//     return { ...state, history, step, currentPlayer };
// }

// const initialState = {
//     history: [Array(9).fill(null)],
//     playerX: 'X',
//     playerY: 'Y',
//     currentPlayer: 'X',
//     step: 0,
//     winningLine: [],
// };

// const [state, dispatch] = useReducer(initialState, ticTacToeReducer);

// dispatch(setPlayerX('A'));
// const currentState = state();
// dispatch(setPlayerY('B'));
// dispatch(playNextStep(3));
// state();