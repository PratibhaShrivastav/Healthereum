import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Font } from "expo";
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
import DoctorPicker from "../components/DoctorPicker";
import { connect } from "react-redux";
import { login, loading, storeUserData } from "../actions";
import axios from "axios";
class ApplicationCard extends Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  state = {
    showButtons: true
  };
  toggle = () => {
    this.setState({
      showButtons: !this.state.showButtons
    });
  };
  handleConfirm = docId => {
    console.log("selected doc is with id = ", docId);
    console.log("selected pat is with id = ", this.props.patientId);

    const token = this.props.auth.user.token;
    let headers = {
      "Content-Type": "application/json"
    };
    headers["Authorization"] = token;
    const axiosInstance = axios.create({
      baseURL: "http://70532991.ngrok.io",
      headers
    });
    const appointmentData = {
      id: this.props.appointmentId,
      status: true,
      assigned_doctor: docId
    };
    axiosInstance
      .patch("/hospital/appointments/", appointmentData)
      .then(val => {
        console.log("result from make appointment req", val.data);
        this.props.makeReviewed(this.props.appointmentId);
        // this.props.storeDocs(val.data);
      })
      .catch(function(error) {
        console.log("error from making appointments", error);
      });
  };
  render() {
    if (this.state.fontLoaded == false) {
      return null;
    }

    const doctorSelectionPanel = (
      <CardItem
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20
        }}
      >
        <DoctorPicker
          toggleFunction={this.toggle}
          handleConfirm={this.handleConfirm}
        />
      </CardItem>
    );
    const acceptDecline = (
      <CardItem
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20
        }}
      >
        <Body>
          <Button
            small
            rounded
            success
            onPress={() => {
              this.toggle();
            }}
          >
            <Text>ACCEPT</Text>
          </Button>
        </Body>
        <Right>
          <Button
            small
            rounded
            danger
            onPress={() => this.props.makeReviewed(this.props.appointmentId)}
          >
            <Text>DECLINE</Text>
          </Button>
        </Right>
      </CardItem>
    );
    const cardBottom = this.state.showButtons
      ? acceptDecline
      : doctorSelectionPanel;
    return (
      <Card style={styles.resultCard}>
        <CardItem
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}
        >
          <Left>
            <Thumbnail source={require("../../assets/guy.png")} />
            <Body>
              <Text>{this.props.name}</Text>
              <Text note>{this.props.age + "/" + this.props.gender}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Body style={styles.address}>
            <Text>{this.props.summary}</Text>
          </Body>
        </CardItem>
        {cardBottom}
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
// export default MyAppointments;
const mapDispatchToProps = dispatch => {
  return {
    login: data => {
      dispatch(login(data));
    },
    loading: caseLoading => {
      dispatch(loading(caseLoading));
    },
    storeUserData: data => {
      dispatch(storeUserData(data));
    }
  };
};
const mapStateToProps = state => {
  const { app, auth } = state;
  return { app, auth };
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCard);
