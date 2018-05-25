import React, { Component } from 'react';
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
} from 'react-native';
import CompanyName from '../Transforms/CompanyNames';
import styles from './Styles/LaunchScreenStyles';
import RoundedButton from '../Components/RoundedButton';
import { connect } from 'react-redux';
import UnsentActions from '../Redux/UnsentRedux';

class PromotionContainer extends Component {
  static navigationOptions = {
    title: 'Promotion'
  };

  state = {
    unsent: 0
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.header) {
      this.setState({
        header:
          nextProps.header === 'product'
            ? 'Product'
            : question[nextProps.header][0],
        list:
          nextProps.header === 'product'
            ? this.props.productList
            : question[nextProps.header].slice(1)
      });
    }
    if (nextProps.refresh) {
      this.refresh();
    }
  }

  refresh() {
    // try {
    //   AsyncStorage.getItem('Unsent', (err, result) => {
    //     if (result !== null) {
    //       const arrResult = JSON.parse(result);
    //       this.props.setUnsent(arrResult);
    //       this.setState({
    //         // unsent: `Click to send ${arrResult.length}`
    //         unsent: `Click to send${this.state.unsent}`
    //       });
    //     }
    //   });
    // } catch (err) {}
    // this.props.refreshUnsent(false);
    this.setState({ unsent: 0 });
  }

  sendUnsent = () => {
    this.setState({ unsent: 0 });
  };

  render() {
    const { navigate } = this.props.navigation;
    console.disableYellowBox = true;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.titleText}>
            Promotions for {'\n'} {this.props.company}
          </Text>

          <RoundedButton
            onPress={() => navigate('Sales', { setParticipantTypeId: '1' })}
            text="Sales"
          />

          <RoundedButton
            onPress={() => navigate('Sales', { setParticipantTypeId: '2' })}
            text="Taster"
          />

          <RoundedButton
            onPress={() => navigate('Foot')}
            text="Foot Traffic"
          />

          <RoundedButton
            onPress={() => this.sendUnsent()}
            text={`click to send ${this.state.unsent}`}
          />

          <RoundedButton
            text="take a pic"
            onPress={() => {
              navigate('PhotoSign');
            }}
          />

          <RoundedButton
            text="add a product"
            onPress={() => {
              navigate('StockList');
            }}
          />

          <RoundedButton
            text="log out"
            onPress={() => {
              navigate('Login');
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  unsent: state.unsent.unsent,
  refresh: state.unsent.refresh,
  company: state.form.client
});

const mapDispatchToProps = dispatch => ({
  setUnsent: unsent => dispatch(UnsentActions.setUnsent(unsent)),
  refreshUnsent: refresh => dispatch(UnsentActions.refreshUnsent(refresh))
});

export default connect(mapStateToProps, mapDispatchToProps)(PromotionContainer);
