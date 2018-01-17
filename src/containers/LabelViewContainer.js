import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import LabelView from "../components/LabelView";
import { addBox } from "../actions";

// convert JSON key-value pairs of boxes to Array
const preprocess = boxes => {
  return Object.keys(boxes).reduce((result, key) => {
    result.push(boxes[key]);
    return result;
  }, []);
};

const mapStateToProps = (state, ownProps) => {
  const committedBoxesArray = preprocess(state.turktool.committedBoxes.present);
  // console.log(committedBoxesArray);
  return {
    committedBoxes: committedBoxesArray,
    imageURL: ownProps.imageURL,
    imageProps: state.turktool.imageProps,
    canUndo: state.turktool.committedBoxes.past.length > 0,
    canRedo: state.turktool.committedBoxes.future.length > 0,
    taskId: ownProps.taskId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    commitDrawingAsBox: (id, position) => {
      dispatch(addBox(id, position));
    },
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelView);
