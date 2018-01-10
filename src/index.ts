import webfontloader from 'webfontloader';
import router from './config/router';
import './styles/common.styl';

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
