import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Container, Content } from "native-base";
import HospitalHeader from "../../components/HospitalHeader";
import Application from "../../components/ApplicationCard";
import { Font } from "expo";
import { getData } from "../../helper/asyncStore";
import { connect } from "react-redux";
import {
  login,
  loading,
  storeUserData,
  storeDocs,
  storeAppointments
} from "../../actions";
import axios from "axios";
class MyAppointments extends React.Component {
  state = {
    fontLoaded: false,
    docsArray: [],
    appointments: []
  };
  makeReviewed = reviewedId => {
    console.log("make reviewed called", reviewedId);

    this.setState({
      appointments: this.state.appointments.filter(
        item => item.appointmentId !== reviewedId
      )
    });
  };
  async componentDidMount() {
    // ********************* font  load ***************
    await Font.loadAsync({
      Roboto: require("../../../assets/fonts/Roboto.ttf"),
      Roboto_medium: require("../../../assets/fonts/Roboto_medium.ttf"),
      ionicons: require("../../../assets/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoaded: true });
    // ********************* getting async stored data ***************
    const userData = JSON.parse(await getData("userData"));
    this.props.storeUserData(userData);
    console.log("data for store hospital", userData);

    // ********************* getting doc list ***************
    let headers = {
      "Content-Type": "application/json"
    };
    headers["Authorization"] = userData.token;
    const axiosInstance = axios.create({
      baseURL: "http://70532991.ngrok.io",
      headers
    });
    axiosInstance
      .get("/user/doctor")
      .then(val => {
        console.log("recevied docs", val.data);
        // this.props.storeDocs(val.data);
        const docsArray = val.data.map(item => ({
          id: item.id,
          name: item.user.first_name
        }));
        console.log(docsArray);
        this.props.storeDocs(docsArray);
      })
      .catch(function(error) {
        console.log("error from receiving docs", error);
      });
    // ********************* getting Appointment list ***************
    axiosInstance
      .get("/hospital/appointments/")
      .then(val => {
        console.log("recevied appointments", val.data);
        const appointmentArray = val.data.pending.map(item => {
          if (item.reviewed === false) {
            return {
              appointmentId: item.id,
              patientName: item.patient.user.first_name,
              patientAge: item.patient.age,
              patientId: item.patient.id,
              summary: item.disease,
              reviewed: item.reviewed
            };
          }
        });
        console.log("appointmentArray", appointmentArray);
        // this.props.storeAppointments(appointmentArray);
        this.setState({ appointments: appointmentArray });
      })
      .catch(function(error) {
        console.log("error from receiving appointments", error);
      });
  }
  render() {
    if (this.state.fontLoaded == false) {
      return null;
    }
    return (
      <Container style={styles.Container}>
        <HospitalHeader />
        <Content padder>
          <ScrollView>
            {this.state.appointments.map(item => {
              if (item.reviewed == false) {
                return (
                  <Application
                    key={item.appointmentId}
                    name={item.patientName}
                    age={item.patientAge}
                    gender={""}
                    summary={item.summary}
                    docsArray={this.state.docsArray}
                    appointmentId={item.appointmentId}
                    patientId={item.patientId}
                    makeReviewed={reviewedId => this.makeReviewed(reviewedId)}
                  />
                );
              }
            })}
          </ScrollView>
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
    paddingTop: 22
  },
  Header: {
    height: 70
  },
  HeaderBody: {
    marginLeft: 20
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
    },
    storeDocs: docs => {
      dispatch(storeDocs(docs));
    },
    storeAppointments: appointments => {
      dispatch(storeAppointments(appointments));
    }
  };
};
const mapStateToProps = state => {
  const { app, auth, hospital } = state;
  return { app, auth, hospital };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments);
