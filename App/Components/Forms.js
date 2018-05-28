import React, { Component } from 'react';
import styles from '../Containers/Styles/LaunchScreenStyles';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
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
import FormActions from '../Redux/FormRedux';
import { connect } from 'react-redux';
import RoundedButton from '../Components/RoundedButton';
import ProductActions from '../Redux/ProductRedux';
import getDate from '../Transforms/Date';

class Forms extends Component {
  state = { reset: null };

  constructRadioGroup(currElement) {
    return (
      <RadioButton key={currElement} value={currElement}>
        <Text style={{ color: 'white' }}>{currElement}</Text>
      </RadioButton>
    );
  }

  next() {
    switch (this.props.header) {
      case 'Product':
        {
          const productId = this.props.productList.find(
            el => el.label === this.state.value
          ).id;
          this.props.setProduct(productId, 'repeat', getDate());
        }
        break;
      case 'Repeat or first time':
        {
          this.props.setRepetition(this.state.reset + 1, 'gender');
        }
        break;
      case 'Gender':
        {
          this.props.setGender(this.state.reset + 1, 'age');
        }
        break;
      case 'Age':
        {
          this.props.setAge(this.state.reset + 1, 'race');
        }
        break;
      case 'Race':
        {
          this.props.setRace(this.state.reset + 1, 'buyingPower');
        }
        break;
      case 'Buying power':
        {
          this.props.setBuyingPower(this.state.reset + 1, 'productFeedback');
        }
        break;
      case 'Product feedback':
        {
          this.props.setFeedback(this.state.reset + 1, getDate());
          this.props.navigate('Promotion');
        }
        break;
      case 'Products list for stock count':
        {
          this.props.setProductStock(this.state.value);
          this.props.navigate('StockCount');
        }
        break;
      default: {
        console.log('Header not found');
      }
    }
    this.setState({ reset: null });
    this.setState({ value: '' });
  }

  back() {
    switch (this.props.header) {
      case 'Product':
        {
          this.props.navigate('Promotion');
        }
        break;
      case 'Repeat or first time':
        {
          this.props.goBack('product');
        }
        break;
      case 'Gender':
        {
          this.props.goBack('repeat');
        }
        break;
      case 'Age':
        {
          this.props.goBack('gender');
        }
        break;
      case 'Race':
        {
          this.props.goBack('age');
        }
        break;
      case 'Buying power':
        {
          this.props.goBack('race');
        }
        break;
      case 'Product feedback':
        {
          this.props.goBack('buyingPower');
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
          color='white'
          highlightColor='#ccc8b9'
          selectedIndex={this.state.reset}
          onSelect={(index, value) => this.setState({ value, reset: index })}
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

const mapStateToProps = state => ({
  productList: state.form.productList
});

const mapDispatchToProps = dispatch => ({
  setProductStock: product => dispatch(ProductActions.setProductStock(product)),


  setProduct: (value, header, time) =>
    dispatch(FormActions.setProduct(value, header, time)),

  setAge: (value, header) => dispatch(FormActions.setAge(value, header)),

  setBuyingPower: (value, header) =>
    dispatch(FormActions.setBuyingPower(value, header)),

  setFeedback: (value, time) => dispatch(FormActions.setFeedback(value, time)),

  setRepetition: (value, header) =>
    dispatch(FormActions.setRepetition(value, header)),

  setRace: (value, header) => dispatch(FormActions.setRace(value, header)),

  setGender: (value, header) => dispatch(FormActions.setGender(value, header)),


  goBack: header => dispatch(FormActions.goBack(header))
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
