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
import Forms from '../Components/Forms';
import { connect } from 'react-redux';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { productDairyMaid, question } from '../Transforms/Questions';
import ProductActions from '../Redux/ProductRedux';

class StockListContainer extends Component {
  static navigationOptions = {
    title: 'StockList'
  };

  state = {
    header: 'Products list for stock count',
    list: this.props.productList.map(el => el.label)
  };

  componentWillMount() {}

  render() {
    console.disableYellowBox = true;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Forms
            header={this.state.header}
            list={this.state.list}
            navigate={navigate}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.form.productList
});

const mapDispatchToProps = dispatch => ({
  setProduct: product => dispatch(ProductActions.setProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(StockListContainer);
