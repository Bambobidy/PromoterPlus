import { call, put, select } from 'redux-saga/effects';
import UnsentActions from '../Redux/UnsentRedux';

export function* sendProduct(api, { count }) {
  const apiName = 'sendProduct';
  const product = yield select(state => state.product.productId);
  const productList = yield select(state => state.form.productList);
  const productId = productList.find(el => el.label === product).id;
  const sendObject = yield select(state => state.form.sendObject);
  const promotionId = sendObject.promotionId;
  const token = yield select(state => state.form.token);
  try {
    const re = yield call(api, {
      token,
      productId,
      count,
      promotionId
    });
    console.log('STOCK', re);
    if (!re.ok) {
      console.log('should call save object');
      yield put(
        UnsentActions.saveObject({
          api: apiName,
          data: { token, productId, count }
        })
      );
    }
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
