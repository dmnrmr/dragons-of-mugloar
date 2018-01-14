import { ACTIONS } from '../constants/gameConstants';
import { store } from '../index';

export const startGame = function (): void {
  store.dispatch({
    type: ACTIONS.GAME_START,
  });
};
