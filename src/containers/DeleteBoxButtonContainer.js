import DeleteBoxButton from "../components/DeleteBoxButton";
import { connect } from "react-redux";
import { deleteBox } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    boxId: ownProps.boxId,
    isDrawing: ownProps.isDrawing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteBox: boxId => {
      dispatch(deleteBox(boxId));
    }
  };
};

const DeleteBoxButtonContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteBoxButton);

export default DeleteBoxButtonContainer;
