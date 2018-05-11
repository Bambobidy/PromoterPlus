import React, { Component } from "react";

import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Camera from "react-native-camera";

export default class PhotoSignContainer extends Component {
  static navigationOptions = {
    title: "PhotoSign"
  };
  
  state = {
    taken: false
  };

  takePicture() {
    this.setState({ taken: true });
    const options = {};
    this.camera
      .capture({ metadata: options })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  displayMessage = (navigate) => {
    if (this.state.taken) {
      return (
        <View>
          <Text style={styles.capture} onPress={navigate("PhotoStand")}>[HAPPY]</Text>
          <Text style={styles.capture}>[NOT HAPPY]</Text>
        </View>
      );
    } else {
      return (
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
          [CAPTURE SIGN IN SHEET]
        </Text>
      );
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          {/* <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
            [CAPTURE SIGN IN SHEET]
          </Text> */}
          {this.displayMessage(navigate)}
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#000",
    padding: 10,
    margin: 40
  }
});
