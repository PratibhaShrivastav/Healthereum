import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right
} from "native-base";
export default class AppointmentRequest extends Component {
  render() {
    return (
      <Card style={styles.resultCard}>
        <CardItem
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}
        >
          <Left>
            <Thumbnail source={require("../../assets/doc.png")} />
            <Body>
              <Text>{this.props.data.name}</Text>
              <Text note>{this.props.data.age}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Body style={styles.address}>
            <Text>{this.props.data.disease}</Text>
          </Body>
        </CardItem>
        <CardItem
          style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}
        >
          <Body>
            <Button
              medium
              rounded
              success
              onPress={() => {
                this.props.handleAccept();
              }}
            >
              <Text>START SESSION</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  address: {
    paddingLeft: 20,
    paddingRight: 20
  },
  resultCard: {
    borderRadius: 20
  }
});
