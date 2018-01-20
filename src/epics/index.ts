import { combineEpics } from 'redux-observable';
import { solveGame, startGame } from './gameEpics';

const rootEpic = combineEpics(
    startGame,
    solveGame,
);

export default rootEpic;
