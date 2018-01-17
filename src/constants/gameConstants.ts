import { GameState } from '../typings/GameTypings';

export const ACTIONS_TYPES = {
  GAME_START: 'GAME_START_ACTION',
  GAME_FAILED_TO_START: 'GAME_FAILED_TO_START_ACTION',
  GAME_STARTED: 'GAME_STARTED_ACTION',
};

export const API = {
  GAME: 'http://www.dragonsofmugloar.com/api/game',
  WEATHER: 'http://www.dragonsofmugloar.com/weather',
};

export enum GameStatus {
  Default,
  InProgress,
  Paused,
  Failed,
}

export const INITIAL_STATE: GameState = {
  gameStatus: GameStatus.Default,
};
