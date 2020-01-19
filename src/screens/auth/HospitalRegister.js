import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  View
} from "native-base";
import { StyleSheet } from "react-native";
import api from "../../api";
import axios from "axios";
import { connect } from "react-redux";
import { login, loading, storeUserData } from "../../actions";
import { setData } from "../../helper/asyncStore";
// import HospitalDefault from "../../components/lotteHospitalDefault";
class HospitalRegister extends Component {
  state = {
    username: "",
    contact: "",
    city: "",
    pincode: "",
    address: "",
    email: "",
    unique_id: "",
    token: "",
    state: ""
  };
  register = () => {
    console.log("clicked register");
    const primaryData = {
      first_name: "",
      last_name: "",
      username: this.state.username,
      password: this.state.password,
      cpassword: this.state.password
    };
    api
      .post("/user/register", primaryData)
      .then(val => {
        console.log("val", val);
        console.log("register part one success", val.data);
        this.registerTwo(val.data.token.key, primaryData);
      })
      .catch(function(error) {
        console.log("register error part two failed", error);
      });
  };
  registerTwo = (key, primaryData) => {
    const secondaryData = {
      unique_id: this.state.unique_id,
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      address: this.state.address,
      pincode: this.state.pincode,
      city: this.state.city,
      state: this.state.state
    };

    // console.log("sec data", secondaryData);
    this.setState({ token: key });
    let headers = { "Content-Type": "application/json" };
    headers["Authorization"] = key;
    const axiosInstance = axios.create({
      baseURL: "http://70532991.ngrok.io",
      headers
    });
    axiosInstance
      .post("/hospital/profile/", secondaryData)
      .then(val => {
        console.log("register part two success", val.data);
        const userData = {
          ...primaryData,
          ...secondaryData,
          token: key,
          id: val.data.id
        };
        this.props.storeUserData(userData);
        console.log("from redux state", this.props.auth.user);
        setData("userData", userData);
        this.props.navigation.navigate("hospital");
      })
      .catch(function(error) {
        console.log("register error part two", error);
      });
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                onChangeText={text => this.setState({ username: text })}
                value={this.state.username}
              />
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Unique Id</Label>
              <Input
                onChangeText={text => this.setState({ unique_id: text })}
                value={this.state.unique_id}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Contact</Label>
              <Input
                onChangeText={text => this.setState({ contact: text })}
                value={this.state.contact}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </Item>

            <Item floatingLabel>
              <Label>City</Label>
              <Input
                onChangeText={text => this.setState({ city: text })}
                value={this.state.city}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Adrress</Label>
              <Input
                onChangeText={text => this.setState({ address: text })}
                value={this.state.address}
              />
            </Item>
            <Item floatingLabel>
              <Label>Pin Code</Label>
              <Input
                onChangeText={text => this.setState({ pincode: text })}
                value={this.state.pincode}
              />
            </Item>
            <Item floatingLabel>
              <Label>State</Label>
              <Input
                onChangeText={text => this.setState({ state: text })}
                value={this.state.state}
              />
            </Item>

            <View style={styles.button}>
              <Button rounded style={styles.submit}>
                <Text>Sign in</Text>
              </Button>
              <Button
                rounded
                style={styles.submit}
                onPress={() => {
                  this.register();
                }}
              >
                <Text>Register</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center"
  },
  input: {
    padding: 5,
    margin: 5
  },
  button: {
    flexDirection: "row"
  },
  submit: {
    margin: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "auto"
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
  const { app, auth } = state;
  return { app, auth };
};
export default connect(mapStateToProps, mapDispatchToProps)(HospitalRegister);
