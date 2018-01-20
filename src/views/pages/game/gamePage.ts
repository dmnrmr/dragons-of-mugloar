import { Store } from 'redux';
import { TagInterface } from 'riot';
import { playGame, stopPlaying } from '../../../actionCreators/gameActionCreators';
import { GameState } from '../../../typings/GameTypings';
import { RootState } from '../../../typings/RootTypings';

interface GamePage extends TagInterface {
  opts: {
    store: Store<RootState>;
  };
  state: GameState;
  stopPlaying(): void;
  unsubscribe(): void;
}

export const init = function (tag: GamePage): void {
  const updateState = function (state: GameState): void {
    tag.state = state;
    tag.update();
  };

  tag.stopPlaying = function (): void {
    tag.opts.store.dispatch(stopPlaying());
  };

  tag.on('before-mount', () => {
    updateState(tag.opts.store.getState().game);
  });

  tag.on('mount', () => {
    tag.unsubscribe = tag.opts.store.subscribe(() => updateState(tag.opts.store.getState().game));

    tag.opts.store.dispatch(playGame());
  });

  tag.on('unmount', () => tag.unsubscribe());
};
