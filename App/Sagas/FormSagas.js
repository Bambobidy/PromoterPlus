import { call, put, select } from 'redux-saga/effects';
import FormActions from '../Redux/FormRedux';
import UnsentActions from '../Redux/UnsentRedux';

export function* sendForm(api) {
  const apiName = 'sendParticipant';
  const object = yield select(state => state.form.sendObject);
  const token = yield select(state => state.form.token);
  try {
    const re = yield call(api, { object, token });
    if (!re.ok) {
      yield put(
        UnsentActions.saveObject({ api: apiName, data: { object, token } })
      );
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
    const response = yield call(api, {
      email,
      password,
      username,
      latitude,
      longitude
    });
    if (!response.ok) {
      if (response.data === 'No promotions for this user today') {
        window.alert('Incorrect user name please check uppercase');
      } else {
        window.alert('Please get signal to log into the app');
      }
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
