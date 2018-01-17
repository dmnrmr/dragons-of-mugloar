import { ACTIONS_TYPES } from '../constants/gameConstants';
import { Dragon, GameAction } from '../typings/GameTypings';

export const startGame = function (): GameAction {
  return {
      type: ACTIONS_TYPES.GAME_START,
  };
};

export const gameFailedToStart = function (): GameAction {
  return {
      type: ACTIONS_TYPES.GAME_FAILED_TO_START,
  };
};

export const gameStarted = function (dragon: Dragon): GameAction {
  return {
      type: ACTIONS_TYPES.GAME_STARTED,
      dragon,
  };
};
