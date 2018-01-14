import { GameStatus } from '../constants/gameConstants';

export interface GameAction {
  type: string;
}

export interface GameState {
  gameStatus: GameStatus;
}
