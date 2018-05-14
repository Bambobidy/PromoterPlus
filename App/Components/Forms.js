import React, { Component } from "react";
import styles from "../Containers/Styles/LaunchScreenStyles";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
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
import FormActions from "../Redux/FormRedux";
import { connect } from "react-redux";
import RoundedButton from "../Components/RoundedButton";

class Forms extends Component {
  state = { reset: null };

  constructRadioGroup(currElement) {
    return (
      <RadioButton value={currElement}>
        <Text>{currElement}</Text>
      </RadioButton>
    );
  }

  getDate() {
    const d = new Date();
    const month = "0" + (d.getMonth() + 1);
    const date = d.getDate();
    let hours = d.getHours().toString();
    let min = d.getMinutes().toString();
    let second = d.getSeconds().toString();
    if (second.length === 1) {
      second = "0" + second;
    }
    if (min.length === 1) {
      min = "0" + min;
    }
    if (hours.length === 1) {
      hours = "0" + hours;
    }
    return (
      d.getFullYear() +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      min +
      ":" +
      second
    );
  }

  next() {
    switch (this.props.header) {
      case "Product":
        {
          this.props.setProduct(this.state.value, "repeat");
        }
        break;
      case "Repeat or first time":
        {
          this.props.setRepetition(this.state.value, "gender");
        }
        break;
      case "Gender":
        {
          this.props.setGender(this.state.value, "age");
        }
        break;
      case "Age":
        {
          this.props.setAge(this.state.value, "race");
        }
        break;
      case "Race":
        {
          this.props.setRace(this.state.value, "buyingPower");
        }
        break;
      case "Buying power":
        {
          this.props.setBuyingPower(this.state.value, "productFeedback");
        }
        break;
      case "Product feedback":
        {
          this.props.setFeedback(this.state.value, this.getDate());
          this.props.navigate("Promotion");
        }
        break;
      default: {
        console.warn("Header not found");
      }
    }
    this.setState({ reset: null });
    this.setState({ value: "" });
  }

  back() {
    switch (this.props.header) {
      case "Product":
        {
          this.props.navigate("Promotion");
        }
        break;
      case "Repeat or first time":
        {
          this.props.goBack("product");
        }
        break;
      case "Gender":
        {
          this.props.goBack("repeat");
        }
        break;
      case "Age":
        {
          this.props.goBack("gender");
        }
        break;
      case "Race":
        {
          this.props.goBack("age");
        }
        break;
      case "Buying power":
        {
          this.props.goBack("race");
        }
        break;
      case "Product feedback":
        {
          this.props.goBack("buyingPower");
        }
        break;
      default: {
      }
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>{this.props.header}</Text>
        <RadioGroup
          selectedIndex={this.state.reset}
          onSelect={(index, value) =>
            this.setState({ value: value, reset: index })
          }
          id="group"
        >
          {this.props.list.map(currElement =>
            this.constructRadioGroup(currElement)
          )}
        </RadioGroup>

        <RoundedButton text="Next" onPress={() => this.next()} />

        <RoundedButton text="BaCK" onPress={() => this.back()} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProduct: (value, header) =>
      dispatch(FormActions.setProduct(value, header)),
    setAge: (value, header) => dispatch(FormActions.setAge(value, header)),
    setBuyingPower: (value, header) =>
      dispatch(FormActions.setBuyingPower(value, header)),
    setFeedback: (value, time) =>
      dispatch(FormActions.setFeedback(value, time)),
    setRepetition: (value, header) =>
      dispatch(FormActions.setRepetition(value, header)),
    setRace: (value, header) => dispatch(FormActions.setRace(value, header)),
    setGender: (value, header) =>
      dispatch(FormActions.setGender(value, header)),
    goBack: header => dispatch(FormActions.goBack(header))
  };
};

export default connect(null, mapDispatchToProps)(Forms);
