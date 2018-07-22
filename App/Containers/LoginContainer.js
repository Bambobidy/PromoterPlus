import React, { Component } from 'react';
import { ScrollView, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
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
    longitude: 28.035048,
    latitude: -26.1286031,
    called: false
  };

  componentDidMount() {
    let stillActive = true;
    for (let i = 0; i < this.props.promoInfo.length; i++) {
      const date = new Date().getTime();
      const endDate = new Date(this.props.promoInfo[i].end);
      const startDate = new Date(this.props.promoInfo[i].start);
      if (startDate.getTime() < date && date < endDate.getTime()) {
        this.props.setProductList(
          this.props.promoInfo[i].products,
          this.props.promoInfo[i].client
        );
        stillActive = false;
        break;
      }
    }
    if (!stillActive) {
      this.props.clearState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productList !== '' && !nextProps.date) {
      this.props.setLoggedIn();
      this.props.setLoggedInDate(new Date());
      this.props.navigation.navigate('PhotoSign');
    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  // getLocation() {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       console.log(position.coords.longitude, position.coords.latitude);
  //       clearInterval(this.interval);
  //       this.setState(
  //         {
  //           longitude: position.coords.longitude,
  //           latitude: position.coords.latitude
  //         },
  //         this.state.called ? this.next() : null
  //       );
  //     },
  //     error => {
  //       console.log(error);
  //       if (error.code === 2) {
  //         window.alert('Please turn on your location');
  //       }
  //     }
  //   );
  // }

  next() {
    this.props.loginRequest(
      'app@promoterplus.com',
      'Password123',
      this.state.username,
      this.state.latitude,
      this.state.longitude
    );
  }

  username = '';

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.titleText}>Log in</Text>

          <Text style={styles.labelText}>User Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ username: text })}
          />

          <RoundedButton
            text="Let me in"
            onPress={() => this.setState({ called: true }, this.next())}
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
  promoInfo: state.form.promoInfo
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (email, password, username, latitude, longitude) =>
    dispatch(
      FormActions.loginRequest(email, password, username, latitude, longitude)
    ),
  setLoggedIn: () => dispatch(TempLoginActions.setLoggedIn()),
  setLoggedInDate: date => dispatch(LoggedInActions.setLoggedInDate(date)),
  clearState: () => dispatch({ type: 'CLEAR_DATA' }),
  setProductList: (products, client) =>
    dispatch(FormActions.setProductList(products, client))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
