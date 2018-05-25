import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendPhoto: ['form'],
});

export const PhotoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  form: ''
});

/* ------------- Reducers ------------- */

export const sendPhoto = (state, { form }) =>
  state.merge({ form });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_PHOTO]: sendPhoto,
});
