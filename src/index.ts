import webfontloader from 'webfontloader';
import riot from 'riot';
import './views/pages/index';
import './styles/common.styl';

const initFonts = () => new Promise((resolve) => {
  webfontloader.load({
    google: {
      families: ['Open+Sans']
    },
    active: () => resolve()
  });
});

const init = () => {
  initFonts().then(() => {
    riot.mount('dom-index-page');
  });
};

init();
