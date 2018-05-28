import { call, put, select } from 'redux-saga/effects';
import UnsentActions from '../Redux/UnsentRedux';

export function* sendProduct(api, { count }) {
  const product = yield select(state => state.product.productId);
  const productList = yield select(state => state.form.productList);
  const productId = productList.find(el => el.label === product).id;
  const token = yield select(state => state.form.token);
  console.log(productId, count);
  try {
    const re = yield call(api, { token, productId, count });
    console.log('OK', re.ok);
    if (!re.ok) {
      console.log('should call save object');
      yield put(UnsentActions.saveObject({ api, data: { token, productId, count } }));
    }
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
