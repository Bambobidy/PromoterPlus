import { call, put, select } from 'redux-saga/effects';
import UnsentActions from '../Redux/UnsentRedux';

export function* sendTraffic(
  api,
  { ageId, buyingPowerId, genderId, raceId, startTime, endTime }
) {
  const token = yield select(state => state.form.token);
  const apiName = 'sendFoot';
  try {
    const re = yield call(api, {
      token,
      ageId,
      buyingPowerId,
      genderId,
      raceId,
      startTime,
      endTime
    });
    console.log(re); 
    if (!re.ok) {
      console.log('should call save object');
      yield put(UnsentActions.saveObject({ api: apiName, data: { ageId, buyingPowerId, genderId, raceId, startTime, endTime } }));
    }
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
