import React, { Component } from "react";
import {
  Alert,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  BackHandler,
  AppState,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import RoundedButton from "../Components/RoundedButton";
import { connect } from "react-redux";
import FormActions from "../Redux/FormRedux";

import styles from "./Styles/LaunchScreenStyles";

class LoginContainer extends Component {
  static navigationOptions = {
    title: "Login"
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.productList !== "") {
        try {
          AsyncStorage.removeItem("Unsent");
        } catch (exception) {
          console.warn("WHY");
        }
      const { navigate } = this.props.navigation;
      navigate("Promotion");
    }
  }

  userName = "";

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.titleText}>Log in</Text>

          <Text style={styles.labelText}>User Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.userName = text;
            }}
          />

          <RoundedButton
            text="Let me in"
            onPress={() => this.props.loginRequest(this.userName)}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    productList: state.form.productList,
    fetching: state.form.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: userName => dispatch(FormActions.loginRequest(userName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
