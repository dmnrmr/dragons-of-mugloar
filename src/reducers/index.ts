import { combineReducers, Reducer } from 'redux';
import { RootState } from '../typings/RootTypings';
import gameReducer from './gameReducer';

const rootReducer: Reducer<RootState> = combineReducers({
  game: gameReducer
});

export default rootReducer;
