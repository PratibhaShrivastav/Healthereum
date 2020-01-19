import React from "react";
import { StyleSheet } from "react-native";
import PatientHeader from "../../components/PatientHeader";
import { Container, Content } from "native-base";
import SearchBar from "../../components/SearchBar";
import HospitalCard from "../../components/HospitalCard";
import axios from "axios";
import { Font } from "expo";
import connect from "react-redux";
class Home extends React.Component {
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
  onSelect = () => {
    console.log("on select called");
    let headers = {
      "Content-Type": "application/json"
    };
    // headers["Authorization"] = userData.token;
    headers["Authorization"] = "5ad01dba3d55416a21d50827f46583926e62a988";
    const axiosInstance = axios.create({
      baseURL: "http://70532991.ngrok.io",
      headers
    });
    axiosInstance
      .post("/hospital/appointments/", {
        disease: "Cough and Cold |  Headache ",
        hospital_id: 28
      })
      .then(val => {
        console.log("recevived data after making appointment", val.data);
        // this.props.storeDocs(val.data);
        // const docsArray = val.data.map(item => ({
        //   id: item.id,
        //   name: item.user.first_name
        // }));
        // console.log(docsArray);
        // this.props.storeDocs(docsArray);
      })
      .catch(function(error) {
        console.log("error after making appointment", error);
      });
  };
  render() {
    if (this.state.fontLoaded == false) {
      return null;
    }
    return (
      <Container style={styles.Container}>
        <PatientHeader />
        <Content padder>
          <SearchBar />
          <HospitalCard
            name={"Apollo"}
            city={"Raipur"}
            address={"Amanaka GE Road Raipur"}
            openingHours={"8:00 - 22:00"}
            onSelect={this.onSelect}
          />
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

export default Home;
