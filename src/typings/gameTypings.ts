import { Action } from 'redux';
import { BattleResult, PlayStatus, WeatherCode } from '../constants/gameConstants';

export interface Knight {
  name: string;
  attack: number;
  armor: number;
  agility: number;
  endurance: number;
}

export interface Dragon {
  scaleThickness: number;
  clawSharpness: number;
  wingStrength: number;
  fireBreath: number;
}

export interface GameResult {
  status: BattleResult;
  message?: string;
}

export interface Weather {
  code: WeatherCode;
}

export interface Game {
  gameId: number;
  knight: Knight;
  dragon?: Dragon;
  result?: GameResult;
}

export interface GameAction extends Action {
  game?: Game;
}

export interface GameState {
  playStatus: PlayStatus;
  games: Game[];
  total: number;
  wins: number;
}
