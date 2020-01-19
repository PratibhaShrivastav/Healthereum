import React from "react";
import { StyleSheet } from "react-native";
import PatientHeader from "../../components/PatientHeader";
import { Container, Content } from "native-base";
import HistoryCard from "../../components/HistoryCard";
const History = () => {
  return (
    <Container style={styles.Container}>
      <PatientHeader />
      <Content padder>
        <HistoryCard />
      </Content>
    </Container>
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
    height: 70
  },
  HeaderBody: {
    marginLeft: 20
  }
});

export default History;
