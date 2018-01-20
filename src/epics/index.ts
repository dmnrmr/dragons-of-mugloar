import { combineEpics } from 'redux-observable';
import playGame from './gameEpics';

const rootEpic = combineEpics(
  playGame,
);

export default rootEpic;
