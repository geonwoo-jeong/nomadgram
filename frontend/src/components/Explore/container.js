import React, { Component } from "react";
import PropTypes from "prop-types";
import Explore from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getExplore: PropTypes.func.isRequired,
    userList: PropTypes.array
  };
  componentDidMount(props) {
    const { getExplore } = this.props;
    getExplore();
  }

  componentWillUnmount() {
    const { getResetExplore } = this.props;
    getResetExplore();
  }

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.userList) {
      return { loading: false };
    } else {
      return { loading: true };
    }
  };
  render() {
    const { userList } = this.props;
    return <Explore {...this.state} userList={userList} />;
  }
}

export default Container;
