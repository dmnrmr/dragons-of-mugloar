import { ACTIONS_TYPES } from '../constants/gameConstants';
import { Game, GameAction, GameResult } from '../typings/GameTypings';

export const playGame = function (): GameAction {
  return {
    type: ACTIONS_TYPES.PLAY_GAME
  };
};

export const stopPlaying = function (): GameAction {
  return {
    type: ACTIONS_TYPES.STOP_PLAYING
  };
};

export const gameFailed = function (): GameAction {
  return {
    type: ACTIONS_TYPES.GAME_FAILED
  };
};

export const gameSolved = function (game: Game, result: GameResult): GameAction {
  return {
    type: ACTIONS_TYPES.GAME_SOLVED,
    game: {
      ...game,
      result
    }
  };
};
