import * as routes from '../constants/routes';
import gamePage from '../views/pages/game';
import indexPage from '../views/pages/index';

interface RouteConfig {
  path: string;
  page: string;
  title?: string;
}

const routeConfig: { [key: string]: RouteConfig } = {
  [routes.INDEX_ROUTE]: {
    path: '/',
    page: indexPage
  },
  [routes.GAME_ROUTE]: {
    path: '/game',
    page: gamePage,
    title: 'Now playing'
  }
};

export default routeConfig;
