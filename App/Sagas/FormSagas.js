import { call, put, select } from 'redux-saga/effects';
import FormActions from '../Redux/FormRedux';
import UnsentActions from '../Redux/UnsentRedux';

export function* sendForm(api) {
  const object = yield select(state => state.form.sendObject);
  console.log('Form', object);
  const token = yield select(state => state.form.token);
  try {
    const re = yield call(api, { object, token });
    console.log('RE', re);
    if (!re.ok) {
      console.log('should call save object');
      yield put(UnsentActions.saveObject({ api, data: { object, token } }));
    }
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}

export function* requestLogin(
  api,
  { email, password, username, latitude, longitude }
) {
  try {
    console.log('requestLogin', email, password, username, latitude, longitude);
    const response = yield call(api, {
      email,
      password,
      username,
      latitude,
      longitude
    });
    console.log(response);
    if (response.error) {
      window.alert('Please get signal to log into the app');
      // yield put(FormActions.loginFailure());
    } else {
      yield put(FormActions.loginSuccess(response.data.token));
    }
  } catch (err) {
    window.alert('Please get signal to log into the app');
  }
}

export function* stockList(api, { token }) {
  try {
    const response = yield call(api, {
      token
    });
    console.log('stock', response);
    yield put(
      FormActions.setProductList(response.data.products, response.data.client)
    );
  } catch (err) {
    window.alert('Please get signal to log into the app');
  }
}
