import { call, put, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

export function* sendProduct(api, { mediaTypeId }) {
  try {
    yield call(api, { mediaTypeId });
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
