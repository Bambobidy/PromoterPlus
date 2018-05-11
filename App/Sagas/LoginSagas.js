import { call, put } from "redux-saga/effects";
import LoginActions from "../Redux/LoginRedux";

export function* requestLogin(api, { userName }) {
  console.warn(userName);
  try {
    const response = yield call(api, {
      userName: userName
    });
    console.warn(response);
    if (response.problem) {
      if (response.problem === "NETWORK_ERROR") {
        window.alert("please get signal to log in");
      } else {
        window.alert("Please let us know that an error has happened");
      }
    }
    else if (response.data.error) {
      window.alert(
        "You Have entered the wrong info please double check your user name"
      );
    }
    else {
      yield put(LoginActions.loginSuccess(response.data.store, response.data.company, response.data.productList));
    }
  } catch (err) {
    yield put(LoginActions.loginFailure(err));
  }
}
