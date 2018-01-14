import { TagInterface } from 'riot';
import { startGame } from '../../../actions/gameActions';
import { store } from '../../../index';
import { GameState } from '../../../typings/gameTypings';

export interface GamePage extends TagInterface {
  state: GameState;
  unsubscribe(): void;
}

export const init = function (tag: GamePage): void {
  const updateState = function (state: GameState): void {
    tag.state = state;
    tag.update();
  };

  tag.on('mount', () => {
    tag.unsubscribe = store.subscribe(() => updateState(store.getState()));

    startGame();
  });

  tag.on('unmount', () => tag.unsubscribe());
};
