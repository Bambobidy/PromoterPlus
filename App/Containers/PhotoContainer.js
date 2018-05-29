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
import PhotoActions from "../Redux/PhotoRedux";
import styles from "../Components/Styles/RNCamera";

class PhotoSignContainer extends Component {
  static navigationOptions = {
    title: "Photo"
  };

  state = {
    taken: false,
    renderCam: true
  };

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ renderCam: false }, this.afterPicture(data));
    }
  };

  afterPicture = data => {
    let form = new FormData();
    form.append("file", data.uri);
    form.append("mediaTypeId", "4");
    console.log("form", form);
    this.props.sendPhoto(form);
    const { navigate } = this.props.navigation;
    navigate("Promotion");
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
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
          [CAPTURE PHOTO]
        </Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setPhotoSign: data => dispatch(LoggedInActions.setPhotoSign(data)),
  sendPhoto: data => dispatch(PhotoActions.sendPhoto(data))
});

export default connect(null, mapDispatchToProps)(PhotoSignContainer);
