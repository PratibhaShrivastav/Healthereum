import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import DoctorHeader from "../../components/DoctorHeader";
import PatientResultCard from "../../components/PatientResultCard";
import SearchBar from "../../components/SearchBar";
import { login, loading, storeUserData } from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
class Search extends React.Component {
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
      .get("/hospital/", {
        data: {
          unique_id: this.props.search.searchTerm
        }
      })
      .then(val => {
        console.log("search from hospital success ", val.data);
        // this.props.storeDocs(val.data);
      })
      .catch(function(error) {
        console.log("search result query errror", error);
      });
  };
  render() {
    return (
      <Container style={styles.Container}>
        <DoctorHeader />
        <Content padder>
          <SearchBar searchFunction={() => this.search()} />
          <PatientResultCard />
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
    }
  };
};
const mapStateToProps = state => {
  const { search, auth } = state;
  return { search, auth };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
