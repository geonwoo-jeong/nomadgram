import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import UserDisplay from "components/UserDisplay";

const Activity = props => {
  return <LoadingActivity />;
};

const LoadingActivity = props => <div>Loading....</div>;

export default Activity;
