import { Action } from 'redux';
import { PlayStatus } from '../constants/gameConstants';

interface Knight {
  name: string;
  attack: number;
  armor: number;
  agility: number;
  endurance: number;
}

export interface Dragon {
  [key: string]: number;
}

export interface GameResult {
  status: string;
  message?: string;
}

export interface Weather {
}

export interface Game {
  gameId: number;
  knight: Knight;
  dragon: Dragon;
  result: GameResult;
}

export interface GameAction extends Action {
  game?: Game;
}

export interface GameState {
  playStatus: PlayStatus;
  games: Game[];
  currentGame?: Game;
}
