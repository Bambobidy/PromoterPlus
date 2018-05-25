import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUnsent: ['unsent'],
  sendUnsent: ['objectToSend'],
  refreshUnsent: ['refresh']
});

export const UnsentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  unsent: [],
  objectToSend: '',
  refresh: true
});

/* ------------- Reducers ------------- */

export const setUnsent = (state, { unsent }) =>
  state.merge({ unsent });

export const refreshUnsent = (state, { refresh }) =>
  state.merge({ refresh });

export const sendUnsent = (state, { objectToSend }) =>
  state.merge({ objectToSend });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_UNSENT]: setUnsent,
  [Types.SEND_UNSENT]: sendUnsent,
  [Types.REFRESH_UNSENT]: refreshUnsent
});
