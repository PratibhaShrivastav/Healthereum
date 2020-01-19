import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Button, Text, Body, Right } from "native-base";
import t from "tcomb-form-native";
import axios from "axios";
import api from "../../api";
import { connect } from "react-redux";
import { login, loading, storeUserData } from "../../actions";
const Form = t.form.Form;
const User = t.struct({
  first_name: t.String,
  last_name: t.String,
  username: t.String,
  password: t.String,
  address: t.String,
  contact: t.Number,
  city: t.String,
  email: t.String,
  age: t.Number,
  pincode: t.String,
  state: t.String,
  unique_id: t.String
});
class PatientRegister extends React.Component {
  register = () => {
    let formInput = this._form.getValue();
    formInput = { ...formInput, cpassword: formInput.password };
    console.log("clicked register");

    console.log("first reg pat data ", formInput);
    api
      .post("/user/register", formInput)
      .then(val => {
        console.log("val", val);
        console.log("register patient part one success", val.data);
        this.registerTwo(val.data.token.key, formInput);
      })
      .catch(function(error) {
        console.log("register patient error part one failed", error);
      });
  };
  registerTwo = (key, formInput) => {
    console.log("key from 2nd reg pat", key);

    console.log("second  data", formInput);
    this.setState({ token: key });
    let headers = { "Content-Type": "application/json" };
    headers["Authorization"] = key;
    const axiosInstance = axios.create({
      baseURL: "http://70532991.ngrok.io",
      headers
    });
    axiosInstance
      .post("user/patient/create_profile", formInput)
      .then(val => {
        console.log("register part two success", val.data);
        const userData = {
          ...formInput,
          token: key,
          id: val.data.id
        };
        this.props.storeUserData(userData);
        console.log(
          "from redux state patient after storing",
          this.props.auth.user
        );
        setData("userData", userData);
        this.props.navigation.navigate("patient");
      })
      .catch(function(error) {
        console.log("register error part two", error);
      });
  };
  render() {
    return (
      <Container style={styles.Container}>
        <Content padder>
          <Form ref={c => (this._form = c)} type={User} />
          <Body>
            <Button
              rounded
              success
              onPress={() => {
                this.register();
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

// export default PatientRegister;

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
export default connect(mapStateToProps, mapDispatchToProps)(PatientRegister);
