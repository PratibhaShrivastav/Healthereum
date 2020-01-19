import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Container, Text } from "native-base";

export default class ChoiceScreen extends Component {
  static navigationOptions = {
    title: "What defines you best ?"
    // headerShown: false
  };

  render() {
    return (
      <Container style={{ alignItems: "center", flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("hospitalRegister")}
        >
          <Image
            source={require("../../../assets/doc.png")}
            style={{ height: 200, width: 200, marginTop: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>
        <Text>DOCTOR</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("patientRegister")}
        >
          <Image
            source={require("../../../assets/guy.png")}
            style={{ height: 200, width: 200, marginTop: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>
        <Text>PATIENT</Text>
      </Container>
    );
  }
}
