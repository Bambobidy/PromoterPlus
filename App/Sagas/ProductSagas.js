import { call, select } from 'redux-saga/effects';

export function* sendProduct(api, { count }) {
  const product = yield select(state => state.product.productId);
  const productList = yield select(state => state.form.productList);
  const productId = productList.find(el => el.label === product).id;
  const token = yield select(state => state.form.token);

  try {
    yield call(api, { token, productId, count });
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
