import { Store } from 'redux';
import { TagInterface } from 'riot';
import { startGame } from '../../../actionCreators/gameActionCreator';
import { GameState } from '../../../typings/GameTypings';
import { RootState } from '../../../typings/RootTypings';

export interface GamePage extends TagInterface {
  opts: {
    store: Store<RootState>;
  };
  state: GameState;
  unsubscribe(): void;
}

export const init = function (tag: GamePage): void {
  const updateState = function (state: GameState): void {
    tag.state = state;
    tag.update();
  };

  tag.on('mount', () => {
    tag.unsubscribe = tag.opts.store.subscribe(() => updateState(tag.opts.store.getState().game));

    tag.opts.store.dispatch(startGame());
  });

  tag.on('unmount', () => tag.unsubscribe());
};
