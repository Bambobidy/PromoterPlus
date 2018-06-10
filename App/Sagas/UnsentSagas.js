import { call, put } from 'redux-saga/effects';
import UnsentActions from '../Redux/UnsentRedux';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

export function* sendUnsent({ toSend }) {
  const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
  try {
    for (let i = 0; i < toSend.length; i++) {
      const re = yield call(api[toSend[i].api], toSend[i].data);
      console.log(re);
      if (!re.ok) {
        console.log('should call save object', re);
        yield put(
          UnsentActions.saveObject({ api: toSend[i].api, data: toSend[i].data })
        );
      }
    }
  } catch (err) {
    window.alert(err);
  }
}
