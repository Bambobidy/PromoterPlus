import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ["userName"],
  setPromotionInfo: ["clientId", "location", "productList"],
  setParticipantTypeId: ["participantTypeId"],
  setProduct: ["product", "header"],
  setAge: ["age", "header"],
  setBuyingPower: ["buyingPower", "header"],
  setFeedback: ["feedback", "time"],
  setRepetition: ["repetitionType", "header"],
  setRace: ["race", "header"],
  setGender: ["gender", "header"],
  goBack: ["header"]
});

export const FormTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userName: "",
  header: "",
  productList: "",
  sendObject: {
    ClientId: "",
    Product: "",
    Location: "",
    Age: "",
    BuyingPower: "",
    Feedback: "",
    ParticipantTypeId: "",
    RepetitionType: "",
    Race: "",
    Gender: "",
    Time: ""
  }
});

/* ------------- Reducers ------------- */

export const loginRequest = (state, { userName }) =>
  state.merge({ userName, fetching: true });

export const setPromotionInfo = (state, { clientId, location, productList }) =>
  state.merge({
    sendObject: { ...state.sendObject, ClientId: clientId, Location: location },
    productList
  });

export const setParticipantTypeId = (state, { participantTypeId }) =>
  state.merge({
    sendObject: { ...state.sendObject, ParticipantTypeId: participantTypeId }
  });

export const setProduct = (state, { product, header }) =>
  state.merge({
    sendObject: { ...state.sendObject, Product: product },
    header
  });

export const setAge = (state, { age, header }) =>
  state.merge({ sendObject: { ...state.sendObject, Age: age }, header });

export const setBuyingPower = (state, { buyingPower, header }) =>
  state.merge({
    sendObject: { ...state.sendObject, BuyingPower: buyingPower },
    header
  });

export const setRepetition = (state, { repetitionType, header }) =>
  state.merge({
    sendObject: { ...state.sendObject, RepetitionType: repetitionType },
    header
  });

export const setRace = (state, { race, header }) =>
  state.merge({ sendObject: { ...state.sendObject, Race: race }, header });

export const setGender = (state, { gender, header }) =>
  state.merge({ sendObject: { ...state.sendObject, Gender: gender }, header });

export const setFeedback = (state, { feedback, time }) =>
  state.merge({
    sendObject: { ...state.sendObject, Feedback: feedback, Time: time }
  });

export const goBack = (state, { header }) =>
  state.merge({
    header
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.SET_PROMOTION_INFO]: setPromotionInfo,
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
