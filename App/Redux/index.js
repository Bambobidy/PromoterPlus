import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import ReduxPersist from '../Config/ReduxPersist';
import { AsyncStorage } from 'react-native';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  form: require('./FormRedux').reducer,
  unsent: require('./UnsentRedux').reducer,
  loggedIn: require('./LoggedInRedux').reducer,
  tempLoggedIn: require('./TempLoginRedux').reducer,
  product: require('./ProductRedux').reducer
});

export default () => {
  const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_DATA') {
      Object.keys(state).forEach(key => {
        AsyncStorage.removeItem(`persist:${key}`);
      });
      state = undefined;
    }
    return reducers(state, action);
  };

  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    finalReducers = persistReducer(ReduxPersist.storeConfig, rootReducer);
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
