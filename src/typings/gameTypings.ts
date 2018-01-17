import { Action } from 'redux';
import { GameStatus } from '../constants/gameConstants';

export interface Dragon {
  dragon: DragonAttributes;
}

export interface GameAction extends Action {
  dragon?: Dragon;
}

export interface GameState {
  gameStatus: GameStatus;
}

interface DragonAttributes {
  [key: string]: number;
}
