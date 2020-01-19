import React, { Component } from "react";

import { StyleSheet } from "react-native";
import {
  CardItem,
  Content,
  Form,
  Item,
  Input,
  Label,
  Body,
  Button,
  Text,
  Right
} from "native-base";
import { Font } from "expo";
export default class DoctorRegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    specialisation: "",
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded == false) {
      return null;
    }

    return (
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
          </Item>

          <Item floatingLabel>
            <Label>Speacialisations</Label>
            <Input
              onChangeText={text => this.setState({ specialisation: text })}
              value={this.state.specialisation}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </Item>
        </Form>
        <CardItem style={styles.submitButton}>
          <Body>
            <Button rounded success>
              <Text>REGISTER</Text>
            </Button>
          </Body>
        </CardItem>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  submitButton: {
    marginTop: 10
  }
});
