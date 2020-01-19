import React from "react";
import { StyleSheet } from "react-native";
import { Card, CardItem, Text, Body, Right } from "native-base";
const HistoryCard = () => {
  return (
    <Card style={styles.Card}>
      <CardItem header bordered>
        <Text>Hospital Name</Text>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text>
            NativeBase is a free and open source framework that enable
            developers to build high-quality mobile apps using React Native iOS
            and Android apps with a fusion of ES6.
          </Text>
        </Body>
      </CardItem>
      <CardItem footer bordered>
        <Text>Doctor Name</Text>
        <Right>
          <Text note>Date</Text>
        </Right>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  Card: {
    borderRadius: 0
  }
});

export default HistoryCard;
