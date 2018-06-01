import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  BackHandler,
  DeviceEventEmitter
} from 'react-native';
import { connect } from 'react-redux';
// import FusedLocation from 'react-native-fused-location';
// import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import RoundedButton from '../Components/RoundedButton';
import FormActions from '../Redux/FormRedux';
import TempLoginActions from '../Redux/TempLoginRedux';
import LoggedInActions from '../Redux/LoggedInRedux';
import styles from './Styles/LaunchScreenStyles';

class LoginContainer extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  state = {
    longitude: '22',
    latitude: '23'
  };

  componentDidMount() {
    // LocationServicesDialogBox.checkLocationServicesIsEnabled({
    //   message:
    //     "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
    //   ok: 'YES',
    //   cancel: 'NO',
    //   enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
    //   showDialog: true, // false => Opens the Location access page directly
    //   openLocationServices: true, // false => Directly catch method is called if location services are turned off
    //   preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
    //   preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
    //   providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    // })
    //   .then(() => {
    //     navigator.geolocation.getCurrentPosition(
    //       position => {
    //         console.log(position.coords.longitude, position.coords.latitude);
    //         this.setState({
    //           longitude: position.coords.longitude,
    //           latitude: position.coords.latitude
    //         });
    //       },
    //       error => console.log(error),
    //       { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    //     );
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   LocationServicesDialogBox.forceCloseDialog();
    // });
    // DeviceEventEmitter.addListener('locationProviderStatusChange', status => {
    //   console.log(status);
    // });
  }

  componentWillReceiveProps(nextProps) {
    const { navigate } = this.props.navigation;
    if (nextProps.productList !== '' && !nextProps.date) {
      console.log(nextProps.loginDate, new Date().getDate());
      if (nextProps.loginDate === new Date().getDate()) {
        console.log('Date', nextProps.loginDate);
        this.props.setLoggedIn();
        this.props.setLoggedInDate(new Date());
        navigate('PhotoSign');
      }
    }
  }

  username = '';

  render() {
    console.disableYellowBox = true;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.titleText}>Log in</Text>

          <Text style={styles.labelText}>User Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.username = text;
            }}
          />

          <RoundedButton
            text="Let me in"
            onPress={() => {
              this.props.loginRequest(
                'app@promoterplus.com',
                'Password123',
                this.username,
                this.state.latitude,
                this.state.longitude
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginDate: state.form.date,
  date: state.loggedIn.date,
  productList: state.form.productList,
  stage: state.loggedIn.stage,
  hasLoggedIn: state.tempLoggedIn.loggedIn
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (email, password, username, latitude, longitude) =>
    dispatch(
      FormActions.loginRequest(email, password, username, latitude, longitude)
    ),
  setLoggedIn: () => dispatch(TempLoginActions.setLoggedIn()),
  setLoggedInDate: date => dispatch(LoggedInActions.setLoggedInDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
