import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { GithubTypes } from '../Redux/GithubRedux';
import { FormTypes } from '../Redux/FormRedux';
import { UnsentTypes } from '../Redux/UnsentRedux';
import { ProductTypes } from '../Redux/ProductRedux';
import { FootTypes } from '../Redux/FootRedux';
import { PhotoTypes } from '../Redux/PhotoRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { getUserAvatar } from './GithubSagas';
import { sendForm, requestLogin, stockList } from './FormSagas';
import { sendUnsent } from './UnsentSagas';
import { sendProduct } from './ProductSagas';
import { sendTraffic } from './TrafficSagas';
import { sendPhoto } from './PhotoSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(FormTypes.LOGIN_REQUEST, requestLogin, api.loginRequest),

    takeLatest(FormTypes.LOGIN_SUCCESS, stockList, api.stockList),

    takeLatest(ProductTypes.SET_NUMBER, sendProduct, api.sendProduct),

    takeLatest(FormTypes.SET_FEEDBACK, sendForm, api.sendParticipant),

    takeLatest(FootTypes.SEND_FOOT, sendTraffic, api.sendFoot),

    takeLatest(PhotoTypes.SEND_PHOTO, sendPhoto, api.sendPhoto),

    takeLatest(UnsentTypes.SEND_UNSENT, sendUnsent)

    // takeLatest(FormTypes.LOGIN_REQUEST, requestLogin, api.loginRequest),

    // takeLatest(ProductTypes.SET_NUMBER, sendProduct, api.sendProduct),

    // takeLatest(UnsentTypes.SEND_UNSENT, sendUnsent, api.sendForm),

    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ]);
}
