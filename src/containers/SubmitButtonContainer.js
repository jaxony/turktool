import { connect } from "react-redux";
import SubmitButton from "../components/SubmitButton.js";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const committedBoxes = state.committedBoxes.present;
  return {
    hasDrawnBox: Object.keys(committedBoxes).length > 0,
    boundingBoxes: committedBoxes,
    taskId: ownProps.taskId,
    imageHeight: state.imageProps.height,
    imageWidth: state.imageProps.width
  };
};

const SubmitButtonContainer = withRouter(
  connect(mapStateToProps)(SubmitButton)
);

export default SubmitButtonContainer;
