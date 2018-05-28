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
import styles from './Styles/LaunchScreenStyles';
import RoundedButton from '../Components/RoundedButton';
import CompanyName from '../Transforms/CompanyNames';
import { connect } from 'react-redux';
import ProductActions from '../Redux/ProductRedux';

class StockCountContainer extends Component {
  static navigationOptions = {
    title: 'StockCount'
  };

  next = () => {
    const { navigate } = this.props.navigation;
    this.props.setNumber(this.count);
    navigate('StockList');
  };

  finish = () => {
    const { navigate } = this.props.navigation;
    this.props.setNumber(this.count);
    navigate('Promotion');
  }

  count = '';

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.titleText}>
            Stock count for {this.props.product}
          </Text>

          <Text style={styles.labelText}>
            Stock count for {this.props.product}
          </Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={text => {
              this.count = text;
            }}
          />

          <RoundedButton
            onPress={() => this.next()}
            text="enter another product"
          />

          <RoundedButton
            onPress={() => this.finish()}
            text="Finish stock take"
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.productId,
  company: state.form.ClientId
});

const mapDispatchToProps = dispatch => ({
  setNumber: num => dispatch(ProductActions.setNumber(num))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  StockCountContainer
);
