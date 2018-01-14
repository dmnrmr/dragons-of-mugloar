import { ACTIONS, GameStatus } from '../constants/gameConstants';
import { GameAction, GameState } from '../typings/gameTypings';

const INITIAL_STATE: GameState = {
  gameStatus: GameStatus.Default,
};

const gameReducer = function (state: GameState = INITIAL_STATE, action: GameAction): GameState {
  switch (action.type) {
    case ACTIONS.GAME_START:
      return {
        ...state,
        gameStatus: GameStatus.InProgress,
      };
    default:
      return state;
  }
};

export default gameReducer;
