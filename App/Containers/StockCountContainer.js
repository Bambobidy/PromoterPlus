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
import styles from "./Styles/LaunchScreenStyles";
import RoundedButton from "../Components/RoundedButton";
import CompanyName from "../Transforms/CompanyNames";
import { connect } from "react-redux";

class StockCountContainer extends Component {
  static navigationOptions = {
    title: "StockCount"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.titleText}>
            You are entering for {CompanyName(this.props.company)} at{" "}
            {this.props.store}
          </Text>

          <Text style={styles.labelText}>Stock count for ?</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={text => {
              this.count = text;
            }}
          />

          <RoundedButton
            onPress={() => navigate("Scan")}
            text="Scan another product"
          />

          <RoundedButton
            onPress={() => navigate("Promotion")}
            text="Finish stock take"
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state.login.store,
    company: state.login.company,
    productList: state.login.productList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: userName => dispatch(LoginActions.loginRequest(userName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StockCountContainer
);
