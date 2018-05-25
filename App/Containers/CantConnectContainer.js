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
import { productDairyMaid, question, companies } from '../Transforms/Questions';
import FormActions from '../Redux/FormRedux';

class CantConnectContainer extends Component {

  static navigationOptions = {
    title: 'CantConnect'
  };

  state = {
    header: 'Store',
    list: companies
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Forms header={this.state.header} list={this.state.list} navigate={navigate} />
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    setParticipantTypeId: participantTypeId => dispatch(FormActions.setParticipantTypeId(participantTypeId))
  });

const mapStateToProps = state => ({
    productList: state.form.productList,
    header: state.form.header
  });

export default connect(mapStateToProps, mapDispatchToProps)(CantConnectContainer);
