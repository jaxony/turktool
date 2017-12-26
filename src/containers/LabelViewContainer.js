import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import LabelView from "../components/LabelView";
import { addBox } from "../actions";

const mapStateToProps = state => {
  return {
    committedBoxes: state.committedBoxes.present,
    imageProps: state.imageProps,
    canUndo: state.committedBoxes.past.length > 0,
    canRedo: state.committedBoxes.future.length > 0
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
