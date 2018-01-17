import { ACTIONS_TYPES, GameStatus, INITIAL_STATE } from '../constants/gameConstants';
import { GameAction, GameState } from '../typings/GameTypings';

const gameReducer = function (state: GameState = INITIAL_STATE, action: GameAction): GameState {
  switch (action.type) {
    case ACTIONS_TYPES.GAME_START:
      return {
        ...state,
        gameStatus: GameStatus.InProgress,
      };
    default:
      return state;
  }
};

export default gameReducer;
