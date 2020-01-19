import React from "react";
import { StyleSheet } from "react-native";
import { Header, Left, Right, Body, Text, Thumbnail, Title } from "native-base";
const Home = () => {
  return (
    <Header style={styles.Header}>
      <Left>
        <Thumbnail source={require("../../assets/doc.png")} />
      </Left>
      <Body style={styles.HeaderBody}>
        <Title>APOLLO </Title>
      </Body>
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
