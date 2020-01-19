import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Button, Text, Body, Right } from "native-base";
import HospitalHeader from "../../components/HospitalHeader";
import DoctorRegisterForm from "../../components/DoctorRegisterForm";
import t from "tcomb-form-native";
import axios from "axios";

import { connect } from "react-redux";
import { login, loading, storeUserData } from "../../actions";
const Form = t.form.Form;
const User = t.struct({
  first_name: t.String,
  last_name: t.String,
  password: t.String,
  username: t.String,
  contact: t.String,
  age: t.Number,
  gender: t.String,
  email: t.String,
  unique_id: t.String,
  contact: t.String,
  address: t.String,
  pincode: t.String,
  state: t.String,
  // multi select
  city: t.String,
  skill: t.list(t.String)
});
// const MyAppointments = () => {
class MyAppointments extends React.Component {
  handleSubmit = async () => {
    const formInput = this._form.getValue();
    console.log("value from form submission ", formInput);
    console.log("token", this.props.auth);

    // req to add
    let headers = { "Content-Type": "application/json" };
    headers["Authorization"] = this.props.auth.user.token;
    const axiosInstance = axios.create({
      baseURL: "http://70532991.ngrok.io",
      headers
    });
    axiosInstance
      .post("/user/doctor/create_profile", formInput)
      .then(val => {
        console.log("added doctor", val.data);
      })
      .catch(function(error) {
        console.log("error adding doc from hos", error);
      });
  };
  render() {
    return (
      <Container style={styles.Container}>
        <HospitalHeader />
        <Content padder>
          <Form ref={c => (this._form = c)} type={User} />
          <Body>
            <Button
              rounded
              success
              onPress={() => {
                this.handleSubmit();
              }}
            >
              <Text>REGISTER</Text>
            </Button>
          </Body>
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
    }
  };
};
const mapStateToProps = state => {
  const { app, auth } = state;
  return { app, auth };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments);
