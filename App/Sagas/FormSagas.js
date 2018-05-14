import { call, put, select } from "redux-saga/effects";
import FormActions from "../Redux/FormRedux";
import UnsentActions from "../Redux/UnsentRedux";
import { AsyncStorage } from "react-native";

export function* sendForm(api) {
  const object = yield select(state => state.form.sendObject);
  try {
    const response = yield call(api, { object });
    if (response.problem) {
      const call = response.config.url.substring(53);
      const unsent = yield select(state => state.unsent.unsent);
      AsyncStorage.setItem(
        "Unsent",
        JSON.stringify(
          unsent.length === 0
            ? [[call, object]]
            : unsent.concat([[call, object]])
        ),
        () => console.warn("ok")
      );
    } else {
      console.warn("yayyyyyy");
      put(UnsentActions.refreshUnsent(true))
    }
  } catch (err) {
    window.alert("Please let us know that an error has happened");
  }
}

export function* requestLogin(api, { userName }) {
  try {
    const response = yield call(api, {
      userName: userName
    });
    if (response.problem) {
      if (response.problem === "NETWORK_ERROR") {
        window.alert("please get signal to log in");
      } else {
        window.alert("Please let us know that an error has happened");
      }
    } else {
      yield put(
        FormActions.setPromotionInfo(
          response.data.company,
          response.data.store,
          response.data.product
        )
      );
    }
  } catch (err) {
    window.alert("Please let us know that an error has ");
  }
}
