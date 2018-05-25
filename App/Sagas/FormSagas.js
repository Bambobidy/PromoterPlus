import { call, put, select } from 'redux-saga/effects';
import FormActions from '../Redux/FormRedux';
import UnsentActions from '../Redux/UnsentRedux';
import { AsyncStorage } from 'react-native';

export function* sendForm(api) {
  const object = yield select(state => state.form.sendObject);
  const token = yield select(state => state.form.token);
  try {
    const response = yield call(api, { object, token });
    if (response.problem) {
      console.log(response.problem);
    } else {
      console.log(response);
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
    console.log(response);
    yield put(
      FormActions.setProductList(response.data.products, response.data.client)
    );
  } catch (err) {
    window.alert('Please get signal to log into the app');
  }
}
