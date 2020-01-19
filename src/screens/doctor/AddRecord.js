import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import DoctorHeader from "../../components/DoctorHeader";
import { Font } from "expo";

// galti ho gayi this is for doc not hospital
class AddRecord extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../../assets/fonts/Roboto.ttf"),
      Roboto_medium: require("../../../assets/fonts/Roboto_medium.ttf"),
      ionicons: require("../../../assets/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded == false) {
      return null;
    }
    return (
      <Container style={styles.Container}>
        <DoctorHeader />
        <Content padder></Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  Container: {
    paddingTop: 24
  },
  Header: {
    height: 70
  },
  HeaderBody: {
    marginLeft: 20
  }
});

export default AddRecord;
