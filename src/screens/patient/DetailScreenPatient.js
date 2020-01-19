import React from "react";
import { StyleSheet } from "react-native";

import PatientHeader from "../../components/PatientHeader";
import HistoryCard from "../../components/HistoryCard";
import { Container, Content, Text } from "native-base";
class DetailScreen extends React.Component {
  onSelectPress = () => {
    console.log("pressed select");
    this.props.navigation.navigate("detail");
  };
  render() {
    return (
      <Container style={styles.Container}>
        <PatientHeader />
        <Content padder>
          <HistoryCard />
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    paddingTop: 22
  },
  text: {
    fontSize: 30
  }
});

export default DetailScreen;
