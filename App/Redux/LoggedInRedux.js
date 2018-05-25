import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setLoggedInDate: ['date'],
  setPhotoSign: ['photoSigned'],
  setPhotoStand: ['photoStand'],
  setPhotoPromoter: ['photoPromoter']
});

export const LoggedInTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  date: null,
  stage: 0,
  base: null,
  photoSigned: null,
  photoStand: null,
  photoPromoter: null
});

/* ------------- Reducers ------------- */

export const setLoggedInDate = (state, { date }) =>
  state.merge({ date, stage: 1 });

export const setPhotoSign = (state, { photoSigned }) =>
  state.merge({ photoSigned, stage: 2 });

export const setPhotoStand = (state, { photoStand }) =>
  state.merge({ photoStand, stage: 3 });

export const setPhotoPromoter = (state, { photoPromoter }) =>
  state.merge({ photoPromoter, stage: 4 });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOGGED_IN_DATE]: setLoggedInDate,
  [Types.SET_PHOTO_SIGN]: setPhotoSign,
  [Types.SET_PHOTO_STAND]: setPhotoStand,
  [Types.SET_PHOTO_PROMOTER]: setPhotoPromoter
});
