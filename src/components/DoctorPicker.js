import React, { Component } from "react";
import {
  Content,
  Icon,
  Picker,
  Form,
  Button,
  Text,
  Right,
  Left,
  Body,
  Card,
  CardItem
} from "native-base";
import { connect } from "react-redux";
import { login, loading, storeUserData, storeDocs } from "../actions";
class DoctorPicker extends Component {
  state = {
    selected: undefined
  };

  onValueChange(value) {
    console.log("current value", value);
    this.setState({
      selected: this.props.hospital.doctorList[0].id
    });
  }
  render() {
    console.log(
      "doc listttttttttttttttttttttttt",
      this.props.hospital.doctorList
    );
    return (
      <Content>
        <Form>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            headerBackButtonText="Baaack!"
            selectedValue={this.props.hospital.doctorList[0].id}
            onValueChange={this.onValueChange.bind(this)}
          >
            {this.props.hospital.doctorList.map(doc => (
              <Picker.Item key={doc.id} label={doc.name} value={doc.id} />
            ))}
          </Picker>
        </Form>

        <CardItem>
          <Left>
            <Button
              small
              rounded
              success
              onPress={() => this.props.handleConfirm(this.state.selected)}
            >
              <Text>CONFIRM</Text>
            </Button>
          </Left>
          <Right>
            <Button
              small
              rounded
              danger
              onPress={() => this.props.toggleFunction()}
            >
              <Text>CANCEL</Text>
            </Button>
          </Right>
        </CardItem>
      </Content>
    );
  }
}

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
    }
  };
};
const mapStateToProps = state => {
  const { hospital } = state;
  return { hospital };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorPicker);
