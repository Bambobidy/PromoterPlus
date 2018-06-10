import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password', 'username', 'latitude', 'longitude'],
  loginSuccess: ['token'],
  loginFailure: [],
  setProductList: ['productList', 'client'],

  setFoot: ['race', 'age', 'gender', 'buyingPower', 'header'],

  setPromotionInfo: ['clientId', 'location', 'productList'],
  setParticipantTypeId: ['participantTypeId'],
  setProduct: ['product', 'header', 'time'],
  setAge: ['age', 'header'],
  setBuyingPower: ['buyingPower', 'header'],
  setFeedback: ['feedback', 'time'],
  setRepetition: ['repetitionType', 'header'],
  setRace: ['race', 'header'],
  setGender: ['gender', 'header'],
  goBack: ['header']
});

export const FormTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: '',
  password: '',
  username: '',
  latitude: '',
  longitude: '',

  token: '',
  error: '',
  productList: '',
  client: '',

  sendObject: {
    ageId: '',
    buyingPowerId: '',
    feedbackId: '',
    genderId: '',
    participantTypeId: '',
    productId: '',
    raceId: '',
    repetitionTypeId: '',
    startTime: '',
    endTime: '',
    date: null
  }
});

/* ------------- Reducers ------------- */

export const loginRequest = (
  state,
  { email, password, username, latitude, longitude }
) =>
  state.merge({
    email,
    password,
    username,
    latitude,
    longitude,
    fetching: true
  });

export const loginFailure = state => state.merge({ error: true });

export const setFoot = (state, { race, age, gender, buyingPower, header }) =>
  state.merge({
    sendObject: {
      ...state.sendObject,
      raceId: race,
      ageId: age,
      genderId: gender,
      buyingPowerId: buyingPower
    },
    header
  });

export const loginSuccess = (state, { token }) =>
  state.merge({ token, error: false, date: new Date().getDate() });

export const setProductList = (state, { productList, client }) =>
  state.merge({
    productList,
    client
  });

export const setParticipantTypeId = (state, { participantTypeId }) =>
  state.merge({
    sendObject: { ...state.sendObject, participantTypeId }
  });

export const setProduct = (state, { product, header, time }) =>
  state.merge({
    sendObject: { ...state.sendObject, productId: product, startTime: time },
    header
  });

export const setAge = (state, { age, header }) =>
  state.merge({ sendObject: { ...state.sendObject, ageId: age }, header });

export const setBuyingPower = (state, { buyingPower, header }) =>
  state.merge({
    sendObject: { ...state.sendObject, buyingPowerId: buyingPower },
    header
  });

export const setRepetition = (state, { repetitionType, header }) =>
  state.merge({
    sendObject: { ...state.sendObject, repetitionTypeId: repetitionType },
    header
  });

export const setRace = (state, { race, header }) =>
  state.merge({ sendObject: { ...state.sendObject, raceId: race }, header });

export const setGender = (state, { gender, header }) =>
  state.merge({
    sendObject: { ...state.sendObject, genderId: gender },
    header
  });

export const setFeedback = (state, { feedback, time }) =>
  state.merge({
    sendObject: { ...state.sendObject, feedbackId: feedback, endTime: time }
  });

export const goBack = (state, { header }) =>
  state.merge({
    header
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.SET_PRODUCT_LIST]: setProductList,
  [Types.SET_FOOT]: setFoot,

  // [Types.SET_PROMOTION_INFO]: setPromotionInfo,
  [Types.SET_PARTICIPANT_TYPE_ID]: setParticipantTypeId,
  [Types.SET_PRODUCT]: setProduct,
  [Types.SET_AGE]: setAge,
  [Types.SET_BUYING_POWER]: setBuyingPower,
  [Types.SET_FEEDBACK]: setFeedback,
  [Types.SET_REPETITION]: setRepetition,
  [Types.SET_RACE]: setRace,
  [Types.SET_GENDER]: setGender,
  [Types.GO_BACK]: goBack
});
