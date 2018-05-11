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

export default class PromotionContainer extends Component {
  static navigationOptions = {
    title: "Promotion"
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

          <Text style={styles.titleText}>
            You are entering for DairyMaid at test
          </Text>

          <RoundedButton onPress={() => this.sales()} text="Sales" />

          <RoundedButton onPress={() => this.taster()} text="Taster" />

          <RoundedButton onPress={() => this.foot()} text="Foot Traffic" />

          <RoundedButton
            onPress={() => this.sendUnsent()}
            text="{this.state.unSent}"
          />

          <RoundedButton
            text="add a product"
            onPress={() => {
              this.setState({ stage: 0 });
            }}
          />

          <RoundedButton
            text="take a pick"
            onPress={() => {
              this.setState({ stage: 0 });
            }}
          />

          <RoundedButton
            text="log out"
            onPress={() => {
              this.setState({ stage: 0 });
            }}
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
