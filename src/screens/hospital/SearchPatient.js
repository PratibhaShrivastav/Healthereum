import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import HospitalHeader from "../../components/HospitalHeader";
import PatientResultCard from "../../components/PatientResultCard";
import SearchBar from "../../components/SearchBar";
import { login, loading, storeUserData, setSearchResult } from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
class SearchPatient extends React.Component {
  state = {
    patient: {
      name: "",
      age: "",
      address: "NO SEARCH RESULTS TILL NOW"
    },
    showSelect: false
  };
  onSelectPress = () => {
    console.log("pressed select");
    this.props.navigation.navigate("detail");
  };
  search = () => {
    console.log("search term is", this.props.search.searchTerm);

    let headers = {
      "Content-Type": "application/json"
    };
    headers["Authorization"] = this.props.auth.user.token;
    const axiosInstance = axios.create({
      baseURL: "http://70532991.ngrok.io",
      headers
    });
    axiosInstance
      .post("/hospital/search/", {
        unique_id: this.props.search.searchTerm
      })
      .then(val => {
        console.log("search from hospital success ", val.data);
        // this.props.storeDocs(val.data);

        const patientCardData = {
          name: val.data.user.first_name + " " + val.data.user.last_name,
          age: val.data.age,
          address: val.data.address
        };
        this.setState({ patient: patientCardData, showSelect: true });
        this.props.setSearchResult(val.data);
      })
      .catch(function(error) {
        const patientCardData = {
          name: "",
          age: "",
          address: "No match found"
        };
        this.setState({ patient: patientCardData, showSelect: false });
        console.log("search result query errror", error);
      });
  };
  render() {
    return (
      <Container style={styles.Container}>
        <HospitalHeader />
        <Content padder>
          <SearchBar searchFunction={() => this.search()} />
          <PatientResultCard
            name={this.state.patient.name}
            age={this.state.patient.age}
            address={this.state.patient.address}
            showSelect={this.state.showSelect}
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
    setSearchResult: result => {
      dispatch(setSearchResult(result));
    }
  };
};
const mapStateToProps = state => {
  const { search, auth } = state;
  return { search, auth };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPatient);
