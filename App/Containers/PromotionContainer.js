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
import TextStyles from '../Components/Styles/RNCamera';
import RoundedButton from '../Components/RoundedButton';
import { connect } from 'react-redux';
import UnsentActions from '../Redux/UnsentRedux';

class PromotionContainer extends Component {
  static navigationOptions = {
    title: 'Promotion'
  };

  state = {
    unsent: this.props.objectToSend
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
    if (nextProps.objectToSend) {
      console.log('next object', nextProps.objectToSend);
      this.setState({ unsent: nextProps.objectToSend });
    }
  }

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

          {/* <View style={styles.row}>
            <RoundedButton
              onPress={() => navigate('Sales', { setParticipantTypeId: '1' })}
              text="Sales"
            />

            <RoundedButton
              onPress={() => navigate('Sales', { setParticipantTypeId: '2' })}
              text="Taster"
            />
          </View> */}

          <RoundedButton onPress={() => navigate('Foot')} text="Foot Traffic" />

          <RoundedButton
            onPress={() => this.props.sendUnsent(this.state.unsent)}
            text={`click to send ${this.state.unsent.length}`}
          />

          <RoundedButton
            text="take a pic"
            onPress={() => {
              navigate('Photo');
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
              this.props.clearState();
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
  company: state.form.client,
  objectToSend: state.unsent.objectToSend
});

const mapDispatchToProps = dispatch => ({
  sendUnsent: toSend => dispatch(UnsentActions.sendUnsent(toSend)),
  clearState: () => {
    dispatch({ type: 'CLEAR_DATA' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PromotionContainer);
