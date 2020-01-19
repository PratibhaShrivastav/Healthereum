import LottieView from "lottie-react-native";
import { DangerZone } from "expo";
import React, { Component } from "react";
import { View } from "react-native";
export default class HosDefault extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={require("../../assets/hos.json")}
        />
      </View>
    );
  }
}
