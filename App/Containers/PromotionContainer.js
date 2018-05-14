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
import CompanyName from "../Transforms/CompanyNames";
import styles from "./Styles/LaunchScreenStyles";
import RoundedButton from "../Components/RoundedButton";
import { connect } from "react-redux";
import UnsentActions from "../Redux/UnsentRedux";

class PromotionContainer extends Component {
  static navigationOptions = {
    title: "Promotion"
  };

  state = {
    unsent: this.props.unsent
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.header) {
      this.setState({
        header:
          nextProps.header === "product"
            ? "Product"
            : question[nextProps.header][0],
        list:
          nextProps.header === "product"
            ? this.props.productList
            : question[nextProps.header].slice(1)
      });
    }
    if (nextProps.refresh){
      console.warn ("IN : ");
      this.refresh();
    }
  }

  refresh(){
    try {
      AsyncStorage.getItem("Unsent", (err, result) => {
        if (result !== null) {
          const arrResult = JSON.parse(result);
          console.warn ("IN : ");
          this.setState({
            unsent: arrResult
          });
          this.props.setUnsent(arrResult);
        }
      });
    } catch (err) {}
    this.props.refreshUnsent(false);
  }

  componentDidMount(){
    this.refresh();
  }

  sendUnsent = () => {
    console.warn("a");
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

          <RoundedButton onPress={() => navigate("Sales",{setParticipantTypeId: "2"})} text="Sales" />

          <RoundedButton onPress={() => navigate("Sales",{setParticipantTypeId: "3"})} text="Taster" />

          <RoundedButton onPress={() => navigate("Foot")} text="Foot Traffic" />

          <RoundedButton
            onPress={() => this.sendUnsent()}
            text={"send unsent " + this.state.unsent.length}
          />

          <RoundedButton
            text="take a pick"
            onPress={() => {
              this.setState({ stage: 0 });
            }}
          />

          <RoundedButton
            text="add a product"
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
    store: state.form.sendObject.Location,
    company: state.form.sendObject.ClientId,
    unsent: state.unsent.unsent,
    refresh: state.unsent.refresh
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUnsent: unsent => dispatch(UnsentActions.setUnsent(unsent)),
    refreshUnsent: refresh => dispatch(UnsentActions.refreshUnsent(refresh))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotionContainer);
