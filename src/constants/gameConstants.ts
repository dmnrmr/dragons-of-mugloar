import { GameState } from '../typings/GameTypings';

export const ACTIONS_TYPES = {
  PLAY_GAME: 'PLAY_GAME_ACTION',
  STOP_PLAYING: 'STOP_PLAYING_ACTION',
  GAME_STARTED: 'GAME_STARTED_ACTION',
  GAME_FAILED_TO_START: 'GAME_FAILED_TO_START_ACTION',
  GAME_SOLVED: 'GAME_SOLVED_ACTION',
};

export const API = {
  GAME: '/api/game',
  WEATHER: '/weather',
};

export enum PlayStatus {
  Stopped,
  Playing,
  Failed,
}

export const INITIAL_STATE: GameState = {
  playStatus: PlayStatus.Stopped,
  games: [],
};
