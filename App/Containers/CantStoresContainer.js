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

class CantStoreContainer extends Component {

  static navigationOptions = {
    title: 'CantStore'
  };

  state = {
    header: 'Store',
    list: companies
  };

  store = ''

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
        <Text style={styles.labelText}>Store</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.store = text;
            }}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(CantStoreContainer);
