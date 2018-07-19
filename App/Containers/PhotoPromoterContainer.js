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
import styles from "../Components/Styles/RNCamera";
import PhotoActions from "../Redux/PhotoRedux";

class PhotoStandContainer extends Component {
  static navigationOptions = {
    title: "PhotoPromoter"
  };

  state = {
    taken: false,
    renderCam: true
  };

  skip = () => {
    this.setState({ renderCam: false }, this.navigate());
  };

  navigate = () => {
    this.props.navigation.navigate("StockList");
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
    form.append("file", { uri: data.uri, type: "image/jpg", name: "image" });
    form.append("mediaTypeId", "3");
    form.append("promotionId", this.props.promotionId);
    this.props.sendPhoto(form);
    const { navigate } = this.props.navigation;
    navigate("StockList");
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
        <View style={styles.row}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
            [CAPTURE PROMOTER]
          </Text>

          <Text style={styles.capture} onPress={this.skip.bind(this)}>
            [SKIP]
          </Text>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setPhotoSign: data => dispatch(LoggedInActions.setPhotoSign(data)),
  sendPhoto: data => dispatch(PhotoActions.sendPhoto(data))
});

const mapStateToProps = state => ({
  promotionId: state.form.sendObject.promotionId
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoStandContainer);
