import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from "react-native";
import { RNCamera } from "react-native-camera";
import { connect } from "react-redux";
import LoggedInActions from "../Redux/LoggedInRedux";
import styles from '../Components/Styles/RNCamera'

class PhotoStandContainer extends Component {
  static navigationOptions = {
    title: "PhotoPromoter"
  };

  state = {
    taken: false,
    renderCam: true
  };

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ renderCam: false });
      console.log(data);
      const { navigate } = this.props.navigation;
      navigate("StockList");
    }
  };

  renderCamera = () => {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={"Permission to use camera"}
        permissionDialogMessage={
          "We need your permission to use your camera phone"
        }
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
      {this.state.renderCam ? this.renderCamera() : null}
        {/* <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        /> */}
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
          [CAPTURE PROMOTER]
        </Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setPhotoSign: data => dispatch(LoggedInActions.setPhotoSign(data))
});

export default connect(null, mapDispatchToProps)(PhotoStandContainer);
