import { call, put, select } from 'redux-saga/effects';

export function* sendPhoto(api, { form }) {
  const token = yield select(state => state.form.token);
  try {
    const re = yield call(api, { token, form });
    console.log('response', re);
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
