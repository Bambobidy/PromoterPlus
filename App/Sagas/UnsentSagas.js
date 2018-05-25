import { call, put, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

export function* sendUnsent(api, { objectToSend }) {
  try {
    const response = yield call(api, { objectToSend });
    if (response.problem) {
      const call = response.config.url.substring(53);
      const unsent = yield select(state => state.unsent.unsent);
      AsyncStorage.setItem(
        'Unsent',
        JSON.stringify(
          unsent.length === 0
            ? [[call, objectToSend]]
            : unsent.concat([[call, object]])
        )
      );
    } else { 
    }
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
