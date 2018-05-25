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
import FootActions from '../Redux/FootRedux';
import getDate from '../Transforms/Date';

class FootContainer extends Component {
  static navigationOptions = {
    title: 'Foot'
  };

  state = { resetRace: null, resetAge: null, resetGender: null, resetBy: null };

  checkFoot = () => {
    this.props.sendFoot(this.state.resetAge, this.state.resetBy, this.state.resetGender, this.state.resetRace, getDate(), getDate());
    this.setState({
      resetRace: null,
      resetAge: null,
      resetGender: null,
      resetBy: null
    });
  }

  render() {
    const { navigate } = this.props.navigation;
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
              onSelect={(index, value) =>
                this.setState({ race: value, resetRace: index })
              }
            >
              <RadioButton value={'White'}>
                <Text>White</Text>
              </RadioButton>

              <RadioButton value={'Black'}>
                <Text>Black</Text>
              </RadioButton>

              <RadioButton value={'Indian'}>
                <Text>Indian</Text>
              </RadioButton>

              <RadioButton value={'Coloured'}>
                <Text>Coloured</Text>
              </RadioButton>

              <RadioButton value={'Asian'}>
                <Text>Asian</Text>
              </RadioButton>
            </RadioGroup>

            <RadioGroup
              selectedIndex={this.state.resetAge}
              onSelect={(index, value) =>
                this.setState({ race: value, resetAge: index })
              }
            >
              <RadioButton value={'16-20'}>
                <Text>16-20</Text>
              </RadioButton>

              <RadioButton value={'21-30'}>
                <Text>21-30</Text>
              </RadioButton>

              <RadioButton value={'31-50'}>
                <Text>31-50</Text>
              </RadioButton>

              <RadioButton value={'50+'}>
                <Text>50+</Text>
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
              selectedIndex={this.state.resetGender}
              onSelect={(index, value) =>
                this.setState({ race: value, resetGender: index })
              }
            >
              <RadioButton value={'Male'}>
                <Text>Male</Text>
              </RadioButton>

              <RadioButton value={'Female'}>
                <Text>Female</Text>
              </RadioButton>

              <RadioButton value={'Both'}>
                <Text>Both</Text>
              </RadioButton>
            </RadioGroup>

            <RadioGroup
              selectedIndex={this.state.resetBy}
              onSelect={(index, value) =>
                this.setState({ race: value, resetBy: index })
              }
            >
              <RadioButton value={'Basket'}>
                <Text>Basket</Text>
              </RadioButton>

              <RadioButton value={'Trolley'}>
                <Text>Trolley</Text>
              </RadioButton>

              <RadioButton value={'None'}>
                <Text>None</Text>
              </RadioButton>
            </RadioGroup>
          </View>

          <RoundedButton onPress={() => this.checkFoot()} text="Send" />
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendFoot: (ageId, buyingPowerId, genderId, raceId, startTime, endTime) =>
    dispatch(FootActions.sendFoot(ageId, buyingPowerId, genderId, raceId, startTime, endTime))
});


export default connect(null, mapDispatchToProps)(FootContainer);
