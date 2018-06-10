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
import FormActions from '../Redux/FormRedux';

class SalesContainer extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps.header);
    if (nextProps.header) {
      console.log('next', nextProps.header);
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
  }

  componentDidMount() {
    this.props.setParticipantTypeId(
      this.props.navigation.state.params.setParticipantTypeId
    );
  }

  static navigationOptions = {
    title: 'Sales'
  };

  state = {
    header: 'Product',
    list: this.props.productList.map(el => el.label)
  };

  render() {
    const { navigate } = this.props.navigation;
    console.disableYellowBox = true;
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

const mapDispatchToProps = dispatch => ({
  setParticipantTypeId: participantTypeId =>
    dispatch(FormActions.setParticipantTypeId(participantTypeId))
});

const mapStateToProps = state => ({
  productList: state.form.productList,
  header: state.form.header
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesContainer);
