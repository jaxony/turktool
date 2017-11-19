import React, { Component } from "react";
import { connect } from "react-redux";
import LabelView from "../components/LabelView";
import { startDrawing, updateDrawing, refreshDrawing } from "../actions";

class LabelViewContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.createRectangle = this.createRectangle.bind(this);
    this.updateRectangle = this.updateRectangle.bind(this);
  }

  /**
   * Fetch boxes that have been saved to the Redux store.
   */
  getCommittedBoxes() {

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
    console.log("mousedown");
    this.createRectangle(event);
  }

  mouseMoveHandler(event) {
    // only update the state if is drawing
    if (!this.props.currentBox.isDrawing) return;
    event.persist();
    this.updateRectangle(event);
  }

  mouseUpHandler(event) {
    // console.log("App: mouse up");
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
        <LabelView imageUrl={this.props.imageUrl} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentBox: state.currentBox
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startDrawing: (drawing) => {
      dispatch(startDrawing(drawing))
    },
    updateDrawing: (drawing) => {
      dispatch(updateDrawing(drawing))
    },
    refreshDrawing: () => {
      dispatch(refreshDrawing())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelViewContainer);