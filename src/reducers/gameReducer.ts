import { ACTIONS_TYPES, PlayStatus, INITIAL_STATE } from '../constants/gameConstants';
import { GameAction, GameState } from '../typings/GameTypings';

const gameReducer = function (state: GameState = INITIAL_STATE, action: GameAction): GameState {
  switch (action.type) {
    case ACTIONS_TYPES.PLAY_GAME:
      return {
        ...state,
        playStatus: PlayStatus.Playing,
      };
    case ACTIONS_TYPES.STOP_PLAYING:
      return {
        ...state,
        playStatus: PlayStatus.Stopped,
      };
    case ACTIONS_TYPES.GAME_SOLVED:
      return {
        ...state,
        games: [...state.games, action.game],
      };
    default:
      return state;
  }
};

export default gameReducer;
