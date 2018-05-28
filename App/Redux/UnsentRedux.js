import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendUnsent: ['toSend'],
  saveObject: ['save']
});

export const UnsentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  objectToSend: [],
  refresh: false,
  toSend: ''
});

/* ------------- Reducers ------------- */

export const sendUnsent = (state, { toSend }) =>
  state.merge({ refresh: true, objectToSend: [], toSend });

export const saveObject = (state, { save }) =>
  state.merge({
    objectToSend: [...state.objectToSend, save]
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_UNSENT]: sendUnsent,
  [Types.SAVE_OBJECT]: saveObject
});
