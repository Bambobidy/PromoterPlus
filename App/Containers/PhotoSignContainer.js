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
    title: "PhotoSign"
  };

  state = {
    taken: false,
    renderCam: true
  };

  skip = () => {
    this.setState({ renderCam: false }, this.navigate());
  };

  navigate = () => {
    this.props.navigation.navigate("PhotoStand");
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
    form.append("mediaTypeId", "1");
    form.append("promotionId", this.props.promotionId);
    form.append("longitude", this.state.longitude);
    form.append("latitude", this.state.latitude);
    this.props.sendPhoto(form);
    const { navigate } = this.props.navigation;
    navigate("PhotoStand");
  };

  componentDidMount() {
    this.getLocation();
    this.interval = setInterval(() => {
      this.getLocation();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.longitude, position.coords.latitude);
        clearInterval(this.interval);
        this.setState(
          {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          },
          this.state.called ? this.next() : null
        );
      },
      error => {
        console.log(error);
        if (error.code === 2) {
          window.alert("Please turn on your location");
        }
      }
    );
  }

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
            [CAPTURE SING IN SHEET]
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
)(PhotoSignContainer);
