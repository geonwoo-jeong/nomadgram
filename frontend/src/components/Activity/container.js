import React, { Component } from "react";
import PropTypes from "prop-types";
import Activity from "./presenter";
class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getNotification: PropTypes.func.isRequired,
    notificationList: PropTypes.array
  };

  componentDidMount(props) {
    const { getNotification } = this.props;
    if (!this.props.notificationList) {
      getNotification();
    } else {
      this.setState({
        loading: false
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.notificationList) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { notificationList } = this.props;
    return <Activity {...this.state} notificationList={notificationList} />;
  }
}

export default Container;
