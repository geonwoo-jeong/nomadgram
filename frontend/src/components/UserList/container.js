import React, { Component } from "react";
import UserList from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    const { userList } = this.props;
    if (userList) {
      this.setState({ loading: false });
    }
  }
  static getDerivedStateFromProps = nextProps => {
    if (nextProps.userList) {
      return { loading: false };
    } else {
      return { loading: true };
    }
  };
  render() {
    return <UserList {...this.props} {...this.state} />;
  }
}

export default Container;
