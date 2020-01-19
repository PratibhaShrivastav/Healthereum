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
export default class CardImageExample extends Component {
  render() {
    return (
      <Card style={styles.resultCard}>
        <CardItem style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <Left>
            <Thumbnail source={require("../../assets/doc.png")} />
            <Body>
              <Text>{this.props.name}</Text>
              <Text note>{this.props.age}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Body style={styles.address}>
            <Text>{this.props.address}</Text>
          </Body>
        </CardItem>
        <CardItem
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <Left></Left>
          <Right>
            {this.props.showSelect ? (
              <Button
                small
                rounded
                success
                onPress={() => {
                  this.props.selectPressFunction();
                }}
              >
                <Text>SELECT</Text>
              </Button>
            ) : null}
          </Right>
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
