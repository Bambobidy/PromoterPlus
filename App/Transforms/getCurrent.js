import { put, select } from 'redux-saga/effects';
import FormActions from '../Redux/FormRedux';

export function* currentInfo() {
  console.log('in');
  const data = yield select(state => state.form.promoInfo);
  // let num = -1;
  // for (let i = 0; i < data.length; i++) {
  //   const date = new Date().getTime();
  //   const endDate = new Date(data[i].end);
  //   const startDate = new Date(data[i].start);
  //   if (startDate.getTime() < date && date < endDate.getTime()) {
  //     num = i;
  //     break;
  //   }
  // }
  // if (num !== -1) {
  //   yield put(FormActions.setProductList(data[num].products, data[num].client));
  // } else {
  //   console.log('error');
  // }
}
