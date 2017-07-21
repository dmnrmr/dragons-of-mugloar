import webfontloader from 'webfontloader';
import { mount } from 'riot';
import Modernizr from 'modernizr';
import './views/app';
import './styles/index.styl';

if (!Modernizr.promises) {
  alert('No promises');
} else {
  alert('Some promises');
}

if (!Modernizr.flexbox) {
  alert('No flexbox');
} else {
  alert('Some flexbox');
}

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
