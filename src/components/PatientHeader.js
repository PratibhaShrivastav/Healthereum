import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Text,
  Thumbnail
} from "native-base";
const Home = () => {
  return (
    <Header style={styles.Header}>
      <Left>
        <Thumbnail source={require("../../assets/guy.png")} />
      </Left>
      <Body style={styles.HeaderBody}>
        <Text>Sumit</Text>
        <Text note>23</Text>
      </Body>
      <Right />
    </Header>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  Container: {
    paddingTop: 22
  },
  Header: {
    height: 70,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  HeaderBody: {
    marginLeft: 20
  }
});

export default Home;
