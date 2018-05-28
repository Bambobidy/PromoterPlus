import { call, put } from 'redux-saga/effects';
import UnsentActions from '../Redux/UnsentRedux';

export function* sendUnsent({ toSend }) {
  try {
    for (let i = 0; i < toSend.length; i++) {
      const re = yield call(toSend[i].api, toSend[i].data);
      if (!re.ok) {
        console.log('should call save object', re);
        yield put(UnsentActions.saveObject({ api: toSend[i].api, data: toSend[i].data }));
      }
    }
  } catch (err) {
    window.alert(err);
  }
}
