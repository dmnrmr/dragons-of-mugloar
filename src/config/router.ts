import riot from 'riot';
import createRouter, { Router, State } from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';
import { INDEX_ROUTE } from '../constants/routes';
import { updateDocumentTitle } from '../services/htmlService';
import routes from './routes';

type RouterListenerCallback = (toState: State, fromState: State | null) => void;

interface RouterWithListenersPlugin extends Router {
  addListener(fn: RouterListenerCallback): this;
}

const router = createRouter([])
  .setOption('defaultRoute', INDEX_ROUTE)
  .usePlugin(browserPlugin())
  .usePlugin(listenersPlugin()) as RouterWithListenersPlugin;

Object.keys(routes).forEach((key) => {
  const route = routes[key];

  router.addNode(key, route.path);
});

router.addListener((toState, fromState) => {
  const { store } = router.getDependencies();
  const route = routes[toState.name];
  const isNavigatingToSameRoute = fromState !== null && fromState.name === toState.name;

  if (isNavigatingToSameRoute) {
    return;
  }

  updateDocumentTitle(route.title);

  riot.mount(document.getElementById('app'), route.page, { store });
});

export default router;
