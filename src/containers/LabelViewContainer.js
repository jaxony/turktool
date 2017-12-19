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
import { calculateRectPosition, isRectangleTooSmall } from "../utils/drawing";
import { BrowserRouter as Router, Route } from "react-router-dom";

class LabelViewContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.createRectangle = this.createRectangle.bind(this);
    this.updateRectangle = this.updateRectangle.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    switch (event.keyCode) {
      case 90:
        console.log('You just pressed Z!');
        if (this.props.canUndo) this.props.onUndo();
        break;
      case 88:
        console.log('You just pressed X!');
        if (this.props.canRedo) this.props.onRedo();
        break;
      default:
        break;
    }
  }

  createRectangle(event) {
    const payload = {
      isDrawing: true,
      startX: event.pageX,
      startY: event.pageY,
      currX: event.pageX,
      currY: event.pageY
    };
    this.props.startDrawing(payload);
  }

  updateRectangle(event) {
    const payload = {
      currX: event.pageX,
      currY: event.pageY
    };
    this.props.updateDrawing(payload);
  }

  mouseDownHandler(event) {
    // only start drawing if the mouse was pressed
    // down inside the image that we want labelled
    if (
      event.target.id !== "LabelViewImg" &&
      event.target.className !== "BoundingBox"
    )
      return;
    event.persist();
    this.createRectangle(event);
  }

  mouseMoveHandler(event) {
    // only update the state if is drawing
    if (!this.props.currentBox.isDrawing) return;
    event.persist();
    this.updateRectangle(event);
  }

  mouseUpHandler(event) {
    // console.log(this.props.imageProps);
    const boxPosition = calculateRectPosition(
      this.props.imageProps,
      this.props.currentBox
    );
    if (this.props.currentBox.isDrawing && !isRectangleTooSmall(boxPosition)) {
      // drawing has ended, and coord is not null,
      // so this rectangle can be committed permanently
      // this.props.onCommitBox(newBox.id, newBox.position);
      this.props.commitDrawingAsBox(
        this.props.currentBox.currentBoxId,
        boxPosition
      );
      // this.committedBoxes.push(newBox);
    }
    this.props.refreshDrawing();
  }

  render() {
    return (
      <div
        id="LabelViewContainer"
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        <Router>
          <Route path="/:taskId" component={LabelView} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBox: state.currentBox,
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

export default connect(mapStateToProps, mapDispatchToProps)(LabelViewContainer);
