import PropTypes from "prop-types";
import "./styles.scss";

const TimeStamp = (props, context) => props.time;

TimeStamp.propTypes = {
  time: PropTypes.string.isRequired
};

export default TimeStamp;
