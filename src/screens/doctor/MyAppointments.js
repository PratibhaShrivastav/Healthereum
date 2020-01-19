import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import DoctorHeader from "../../components/DoctorHeader";
import AppointmentRequest from "../../components/AppointmentRequest";
import { Font } from "expo";
import axios from "axios";
class MyAppointments extends React.Component {
  state = {
    fontLoaded: false,
    applicationArray: []
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../../assets/fonts/Roboto.ttf"),
      Roboto_medium: require("../../../assets/fonts/Roboto_medium.ttf"),
      ionicons: require("../../../assets/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoaded: true });

    let headers = {
      "Content-Type": "application/json"
    };
    headers["Authorization"] = "8c716ebfae1ee711abf95f37fcc9e89a129df6a0";
    const axiosInstance = axios.create({
      baseURL: "http://70532991.ngrok.io",
      headers
    });
    axiosInstance
      .get("/user/doctor/appointments")
      .then(val => {
        console.log("recevied docs get doc's appointments ", val.data);
        const applicationArray = val.data.map(item => {
          return {
            disease: item.disease,
            name:
              item.patient.user.first_name + " " + item.patient.user.last_name,
            age: item.patient.age
          };
        });
        console.log("application array", applicationArray);
        this.setState({ applicationArray });
      })
      .catch(function(error) {
        console.log("error from receiving docs", error);
      });
  }
  moveToNext = () => {
    console.log("move");
    this.props.navigation.navigate("detail");
  };
  render() {
    if (this.state.fontLoaded == false) {
      return null;
    }
    return (
      <Container style={styles.Container}>
        <DoctorHeader />
        <Content padder>
          {this.state.applicationArray.map(item => (
            <AppointmentRequest handleAccept={this.moveToNext} data={item} />
          ))}
        </Content>
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

export default MyAppointments;
