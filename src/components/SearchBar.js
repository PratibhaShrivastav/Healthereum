import React from "react";
import { Header, Item, Input, Icon, Button, Text } from "native-base";
import { login, loading, setSearchTerm } from "../actions";
import { connect } from "react-redux";
class SearchBar extends React.Component {
  state = {
    searchTerm: ""
  };
  render() {
    return (
      <Header searchBar>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={text => this.props.setSearchTerm(text)}
            value={this.props.search.searchTerm}
          />
          <Icon name="ios-people" />
        </Item>
        <Item>
          <Button
            transparent
            small
            rounded
            onPress={() => this.props.searchFunction()}
          >
            <Text>Search</Text>
          </Button>
        </Item>
      </Header>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: data => {
      dispatch(login(data));
    },
    setSearchTerm: term => {
      dispatch(setSearchTerm(term));
    }
  };
};
const mapStateToProps = state => {
  const { search, auth } = state;
  return { search, auth };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
