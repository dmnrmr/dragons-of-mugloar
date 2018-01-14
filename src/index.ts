import { createStore } from 'redux';
import webfontloader from 'webfontloader';
import router from './config/router';
import gameReducer from './reducers/gameReducer';
import './styles/common.styl';

export const store = createStore(gameReducer);

const initFonts = () => new Promise((resolve) => {
  webfontloader.load({
    google: {
      families: ['Open Sans:300,700'],
    },
    active: () => resolve(),
  });
});

const init = () => {
  initFonts().then(() => {
    router.start();
  });
};

init();
