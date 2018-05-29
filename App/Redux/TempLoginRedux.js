import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setLoggedIn: []
});

export const TempLoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loggedIn: false
});

/* ------------- Reducers ------------- */

export const setLoggedIn = (state) =>
  state.merge({ loggedIn: true });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOGGED_IN]: setLoggedIn
});
