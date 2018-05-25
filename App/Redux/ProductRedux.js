import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setProductStock: ['productId'],
  setNumber: ['count']
});

export const ProductTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  productId: null,
  count: 0
});

/* ------------- Reducers ------------- */

export const setProductStock = (state, { productId }) =>
  state.merge({
    productId
  });

export const setNumber = (state, { count }) => state.merge({ count });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PRODUCT_STOCK]: setProductStock,
  [Types.SET_NUMBER]: setNumber
});
