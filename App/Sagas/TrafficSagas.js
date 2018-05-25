import { call, put, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

export function* sendTraffic(
  api,
  { ageId, buyingPowerId, genderId, raceId, startTime, endTime }
) {
  console.log(ageId, buyingPowerId, genderId, raceId, startTime, endTime);
  const token = yield select(state => state.form.token);
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
  } catch (err) {
    window.alert('Please let us know that an error has happened');
  }
}
