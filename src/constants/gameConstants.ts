import { GameState } from '../typings/GameTypings';

export const ACTIONS_TYPES = {
  PLAY_GAME: 'PLAY_GAME_ACTION',
  STOP_PLAYING: 'STOP_PLAYING_ACTION',
  GAME_STARTED: 'GAME_STARTED_ACTION',
  GAME_FAILED: 'GAME_FAILED_ACTION',
  GAME_SOLVED: 'GAME_SOLVED_ACTION'
};

export const API = {
  GAME: 'http://www.dragonsofmugloar.com/api/game',
  WEATHER: 'http://www.dragonsofmugloar.com/weather/api/report'
};

export enum PlayStatus {
  Stopped = 'stopped',
  Playing = 'playing',
  Failed = 'failure'
}

export const INITIAL_STATE: GameState = {
  playStatus: PlayStatus.Stopped,
  games: [],
  total: 0,
  wins: 0
};

export enum BattleResult {
  Defeat = 'Defeat',
  Victory = 'Victory'
}

export enum WeatherCode {
  Normal = 'NMR',
  Flood = 'HVA',
  Fog = 'FUNDEFINEDG',
  Storm = 'SRO',
  Dry = 'T E'
}

export enum DragonStat {
  Scale = 'scaleThickness',
  Claws = 'clawSharpness',
  Wings = 'wingStrength',
  Fire = 'fireBreath'
}
