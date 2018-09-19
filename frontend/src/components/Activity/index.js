import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  console.log(state.user);
  const {
    user: { notificationList }
  } = state;
  return {
    notificationList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getNotification: () => {
      dispatch(userActions.getNotification());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
