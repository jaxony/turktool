import React, { Component } from "react";
import LabelImage from "./LabelImage.js";
import BoundingBoxes from "./BoundingBoxes.js";

/**
 * `LabelView` is a container for `LabelImage` and
 * `BoundingBoxes` components.
 */
export default class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isDrawing: false,
      currentBoxId: 0,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    };
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  /**
   * Determines if a new bounding box is being drawn.
   * If a new bbox is being drawn, increment the bbox id to
   * a new id.
   * 
   * @param {boolean} isDrawing whether a bbox is currently being drawn
   * @param {int} lastBoxId id of last bounding box being drawn
   */
  updateCurrentBoxId(isDrawing, lastBoxId) {
    if (isDrawing) return lastBoxId;
    return lastBoxId + 1;
  }

  mouseDownHandler(event) {
    event.persist();
    // console.log("mouse down");
    // console.log(event);
    this.createRectangle(event);
    // console.log(this.state);
  }

  createRectangle(event) {
    this.setState(prevState => ({
      isDrawing: true,
      startX: event.pageX,
      startY: event.pageY
    }));
  }

  updateRectangle(event) {
    this.setState(prevState => ({
      endX: event.pageX,
      endY: event.pageY
    }));
  }

  mouseMoveHandler(event) {
    // only update the state if is drawing
    if (!this.state.isDrawing) return;
    console.log("move");
    event.persist();
    this.updateRectangle(event);
    console.log(this.state.endX + ", " + this.state.endY);
  }

  incrementToNextBoxId(event) {
    this.setState(prevState => ({
      currentBoxId: prevState.currentBoxId + 1
    }));
  }

  mouseUpHandler(event) {
    event.persist();
    console.log("mouse up");
    // console.log(event);
    this.updateRectangle(event);
    this.incrementToNextBoxId();
    this.setState({ isDrawing: false });
    console.log(this.state.endX + ", " + this.state.endY);
  }

  render() {
    var rectangle = {
      x0: 10,
      y0: 140,
      x1: 300,
      y1: 200
    };
    return (
      <div
        className="LabelView"
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        <BoundingBoxes className="BoundingBoxes" rectangle={rectangle} />
        <LabelImage className="LabelImage" imageUrl={this.props.imageUrl} />
      </div>
    );
  }
}
