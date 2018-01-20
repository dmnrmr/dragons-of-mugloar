import { ACTIONS_TYPES } from '../constants/gameConstants';
import { trainDragon } from '../services/gameService';
import { Game, GameAction, GameResult } from '../typings/GameTypings';

export const playGame = function (): GameAction {
  return {
    type: ACTIONS_TYPES.PLAY_GAME,
  };
};

export const stopPlaying = function (): GameAction {
  return {
    type: ACTIONS_TYPES.STOP_PLAYING,
  };
};

export const gameFailedToStart = function (): GameAction {
  return {
    type: ACTIONS_TYPES.GAME_FAILED_TO_START,
  };
};

export const gameStarted = function (game: Game): GameAction {
  return {
    type: ACTIONS_TYPES.GAME_STARTED,
    game: {
      ...game,
      dragon: trainDragon(),
    },
  };
};

export const gameSolved = function (game: Game, result: GameResult): GameAction {
  return {
    type: ACTIONS_TYPES.GAME_SOLVED,
    game: {
      ...game,
      result,
    },
  };
};
