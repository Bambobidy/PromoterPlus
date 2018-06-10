import { call } from 'redux-saga/effects';

export function* sendProduct(api, { mediaTypeId }) {
  try {
    const re = yield call(api, { mediaTypeId });
    console.log('SENDING PHOTOS', re);
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
