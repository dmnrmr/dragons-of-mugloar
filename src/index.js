import webfontloader from 'webfontloader';
import { mount } from 'riot';
import './views/app';
import './styles/index.styl';

const initFonts = () => new Promise((resolve) => {
  webfontloader.load({
    google: {
      families: ['Open+Sans'],
    },
    active: () => resolve(),
  });
});

const init = () => {
  initFonts().then(() => {
    mount('app');
  });
};

init();
