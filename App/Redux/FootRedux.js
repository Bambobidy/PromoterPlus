import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendFoot: ['ageId', 'buyingPowerId', 'genderId', 'raceId', 'startTime', 'endTime'],
});

export const FootTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  ageId: '',
  buyingPowerId: '',
  genderId: '',
  raceId: '',
  startTime: '',
  endTime: ''
});

/* ------------- Reducers ------------- */

export const sendFoot = (state, { ageId, buyingPowerId, genderId, raceId, startTime, endTime }) =>
  state.merge({ ageId, buyingPowerId, genderId, raceId, startTime, endTime });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_FOOT]: sendFoot,
});
