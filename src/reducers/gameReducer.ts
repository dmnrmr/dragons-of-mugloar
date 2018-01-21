import { ACTIONS_TYPES, BattleResult, INITIAL_STATE, PlayStatus } from '../constants/gameConstants';
import { Game, GameAction, GameState } from '../typings/GameTypings';

const updateWinCounter = function (state: GameState, game: Game): number {
  if (game.result.status === BattleResult.Victory) {
    return state.wins + 1;
  }

  return state.wins;
};

const gameReducer = function (state: GameState = INITIAL_STATE, action: GameAction): GameState {
  switch (action.type) {
    case ACTIONS_TYPES.PLAY_GAME:
      return {
        ...state,
        playStatus: PlayStatus.Playing
      };
    case ACTIONS_TYPES.STOP_PLAYING:
      return {
        ...state,
        playStatus: PlayStatus.Stopped
      };
    case ACTIONS_TYPES.GAME_SOLVED:
      return {
        ...state,
        games: [...state.games, action.game],
        total: state.total + 1,
        wins: updateWinCounter(state, action.game)
      };
    case ACTIONS_TYPES.GAME_FAILED:
      return {
        ...state,
        playStatus: PlayStatus.Failed
      };
    default:
      return state;
  }
};

export default gameReducer;
