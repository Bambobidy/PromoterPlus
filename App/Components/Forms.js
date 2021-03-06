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
  state = { reset: null, value: '' };

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
          if (this.state.value !== '') {
            const productId = this.props.productList.find(
              el => el.label === this.state.value
            ).id;
            console.log(getDate());
            this.props.setProduct(productId, 'repeat', getDate());
          } else {
            window.alert('please enter a product');
          }
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
          if (this.state.value !== '') {
            this.props.setProductStock(this.state.value);
            this.props.navigate('StockCount');
          } else {
            window.alert('please enter a product');
          }
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

  checkFoot = () => {
    this.props.setFoot(
      this.state.resetRace + 1,
      this.state.resetAge + 1,
      this.state.resetGender + 1,
      this.state.resetBy + 1,
      'productFeedback'
    );
  };

  render() {
    console.log(this.props.header);
    if (this.props.header === 'Repeat or first time') {
      return (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              <Text style={styles.titleText}>Race</Text>

              <Text style={styles.titleText}>Age</Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              <RadioGroup
                selectedIndex={this.state.resetRace}
                color="white"
                highlightColor="#ccc8b9"
                onSelect={(index, value) =>
                  this.setState({ race: value, resetRace: index })
                }
              >
                <RadioButton value={'White'}>
                  <Text style={{ color: 'white' }}>White</Text>
                </RadioButton>

                <RadioButton value={'Black'}>
                  <Text style={{ color: 'white' }}>Black</Text>
                </RadioButton>

                <RadioButton value={'Indian'}>
                  <Text style={{ color: 'white' }}>Indian</Text>
                </RadioButton>

                <RadioButton value={'Coloured'}>
                  <Text style={{ color: 'white' }}>Coloured</Text>
                </RadioButton>

                <RadioButton value={'Asian'}>
                  <Text style={{ color: 'white' }}>Asian</Text>
                </RadioButton>
              </RadioGroup>

              <RadioGroup
                selectedIndex={this.state.resetAge}
                color="white"
                highlightColor="#ccc8b9"
                onSelect={(index, value) =>
                  this.setState({ race: value, resetAge: index })
                }
              >
                <RadioButton value={'16-20'}>
                  <Text style={{ color: 'white' }}>16-20</Text>
                </RadioButton>

                <RadioButton value={'21-30'}>
                  <Text style={{ color: 'white' }}>21-30</Text>
                </RadioButton>

                <RadioButton value={'31-50'}>
                  <Text style={{ color: 'white' }}>31-50</Text>
                </RadioButton>

                <RadioButton value={'50+'}>
                  <Text style={{ color: 'white' }}>50+</Text>
                </RadioButton>
              </RadioGroup>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              <Text style={styles.titleText}>Gender</Text>

              <Text style={styles.titleText}>Buying Power</Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              <RadioGroup
                color="white"
                highlightColor="#ccc8b9"
                selectedIndex={this.state.resetGender}
                onSelect={(index, value) =>
                  this.setState({ race: value, resetGender: index })
                }
              >
                <RadioButton value={'Male'}>
                  <Text style={{ color: 'white' }}>Male</Text>
                </RadioButton>

                <RadioButton value={'Female'}>
                  <Text style={{ color: 'white' }}>Female</Text>
                </RadioButton>

                <RadioButton value={'Both'}>
                  <Text style={{ color: 'white' }}>Both</Text>
                </RadioButton>
              </RadioGroup>

              <RadioGroup
                color="white"
                highlightColor="#ccc8b9"
                selectedIndex={this.state.resetBy}
                onSelect={(index, value) =>
                  this.setState({ race: value, resetBy: index })
                }
              >
                <RadioButton value={'Basket'}>
                  <Text style={{ color: 'white' }}>Basket</Text>
                </RadioButton>

                <RadioButton value={'Trolley'}>
                  <Text style={{ color: 'white' }}>Trolley</Text>
                </RadioButton>

                <RadioButton value={'None'}>
                  <Text style={{ color: 'white' }}>None</Text>
                </RadioButton>
              </RadioGroup>
            </View>

            <RoundedButton onPress={() => this.checkFoot()} text="Send" />
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>{this.props.header}</Text>
        <RadioGroup
          color="white"
          highlightColor="#ccc8b9"
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

  setFoot: (race, age, gender, buyingPower, header) =>
    dispatch(FormActions.setFoot(race, age, gender, buyingPower, header)),

  setProduct: (value, header, time) =>
    dispatch(FormActions.setProduct(value, header, time)),

  setRace: (value, header) => dispatch(FormActions.setRace(value, header)),

  setAge: (value, header) => dispatch(FormActions.setAge(value, header)),

  setGender: (value, header) => dispatch(FormActions.setGender(value, header)),

  setBuyingPower: (value, header) =>
    dispatch(FormActions.setBuyingPower(value, header)),

  setFeedback: (value, time) => dispatch(FormActions.setFeedback(value, time)),

  setRepetition: (value, header) =>
    dispatch(FormActions.setRepetition(value, header)),

  goBack: header => dispatch(FormActions.goBack(header))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms);
