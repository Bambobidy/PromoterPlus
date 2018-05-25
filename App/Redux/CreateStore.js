import { createStore, applyMiddleware, compose } from 'redux';
import Config from '../Config/DebugConfig';
import createSagaMiddleware from 'redux-saga';
import ScreenTracking from './ScreenTrackingMiddleware';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { persistStore, autoRehydrate } from 'redux-persist';
import RehydrationServices from '../Services/RehydrationServices';
import ReduxPersistConfig from '../Config/ReduxPersistConfig';
import { createLogger } from 'redux-logger';
import ReduxPersist from '../Config/ReduxPersistConfig';

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Logger Middleware ------------- */
  const loggerMiddleware = createLogger();
  middleware.push(loggerMiddleware);

  /* ------------- Navigation Middleware ------------ */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
  );
  middleware.push(navigationMiddleware);

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking);

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron
    ? console.tron.createSagaMonitor()
    : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  // if (ReduxPersist.active) {
  //   enhancers.push(autoRehydrate());
  // }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron
    ? console.tron.createStore
    : createStore;
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  // kick off root saga
  const sagasManager = sagaMiddleware.run(rootSaga);

  let persistor;
  if (ReduxPersistConfig.active) {
    persistor = RehydrationServices.updateReducers(store);
  } else {
    persistor = persistStore(store);
  }

  return {
    persistor,
    store,
    sagasManager,
    sagaMiddleware
  };
};
