import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { userList, imageList },
    router: { location }
  } = state;
  return {
    userList,
    imageList,
    location
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { searchTerm }
    }
  } = ownProps;
  return {
    searchByTerm: () => {
      dispatch(userActions.searchByTerm(searchTerm));
    },
    getResetTerm: () => {
      dispatch(userActions.getResetTerm());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
