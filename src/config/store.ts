import { applyMiddleware, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { INITIAL_STATE } from '../constants/gameConstants';
import rootEpic from '../epics';
import rootReducer from '../reducers';
import { RootState } from '../typings/RootTypings';

const epicMiddleware = createEpicMiddleware(rootEpic);

const configureStore = function (): Store<RootState> {
  const store = createStore(
    rootReducer,
    {
      game: INITIAL_STATE
    },
    applyMiddleware(epicMiddleware)
  );

  return store;
};

export default configureStore;
