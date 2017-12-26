import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import LabelView from "../components/LabelView";
import {
  startDrawing,
  updateDrawing,
  refreshDrawing,
  addBox
} from "../actions";

const mapStateToProps = state => {
  return {
    currentBox: state.currentBox,
    committedBoxes: state.committedBoxes.present,
    imageProps: state.imageProps,
    canUndo: state.committedBoxes.past.length > 0,
    canRedo: state.committedBoxes.future.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startDrawing: drawing => {
      dispatch(startDrawing(drawing));
    },
    updateDrawing: drawing => {
      dispatch(updateDrawing(drawing));
    },
    refreshDrawing: () => {
      dispatch(refreshDrawing());
    },
    commitDrawingAsBox: (id, position) => {
      dispatch(addBox(id, position));
    },
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelView);
