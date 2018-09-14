import React, { Component } from "react";
import Activity from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  componentDidMount(props) {
    console.log("componentDidMount");
    // const { getNotification } = this.props;
    // getNotification();
  }

  render() {
    console.log("render");
    return <div>return</div>;
    //    const { userList } = this.props;
    //    return <Activity {...this.state} userList={userList} />;
    //    return <Activity {...this.state} userList={userList} />;
  }
}

export default Container;
