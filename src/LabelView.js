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
    // console.log("move");
    event.persist();
    this.updateRectangle(event);
    // console.log(this.state.endX + ", " + this.state.endY);
  }

  incrementToNextBoxId(event) {
    this.setState(prevState => ({
      currentBoxId: prevState.currentBoxId + 1
    }));
  }

  mouseUpHandler(event) {
    event.persist();
    // console.log("mouse up");
    // console.log(event);
    this.updateRectangle(event);
    this.incrementToNextBoxId();
    this.setState({ isDrawing: false });
    // console.log(this.state.endX + ", " + this.state.endY);
  }

  getCommittedBoxes() {
    return [];
  }

  render() {
    // TODO: get committed rectangles from Redux store
    var committedBoxes = this.getCommittedBoxes();
    
    // get coords for current rectangle
    if (this.state.startX !== null) {
      var rectangle = {
        x0: this.state.startX,
        x1: this.state.endX,
        y0: this.state.startY,
        y1: this.state.endY
      }
      committedBoxes.push(rectangle);
    }
    
    const numBoxesToRender = committedBoxes.length;
    
    return (
      <div
        className="LabelView"
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        {numBoxesToRender > 0 && 
          <BoundingBoxes
            className="BoundingBoxes"
            boxes={committedBoxes} />
        }
        <LabelImage className="LabelImage" imageUrl={this.props.imageUrl} />
      </div>
    );
  }
}
