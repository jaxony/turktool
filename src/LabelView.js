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
      x0: null,
      y0: null,
      x1: null,
      y1: null
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
      x0: event.pageX,
      y0: event.pageY
    }));
  }

  updateRectangle(event) {
    this.setState(prevState => ({
      x0: Math.min(prevState.x0, event.pageX),
      y0: Math.min(prevState.y0, event.pageY),
      x1: Math.max(prevState.x1, event.pageX),
      y1: Math.max(prevState.y1, event.pageY),
    }));
  }

  mouseMoveHandler(event) {
    // only update the state if is drawing
    if (!this.state.isDrawing) return;
    // console.log("move");
    event.persist();
    this.updateRectangle(event);
    // console.log(this.state.x1 + ", " + this.state.y1);
  }

  incrementToNextBoxId(event) {
    this.setState(prevState => ({
      currentBoxId: prevState.currentBoxId + 1
    }));
  }

  refreshState() {
    // set drawing back to false
    // turn all coordinates back to null
    this.setState({
      isDrawing: false,
      x0: null,
      y0: null,
      x1: null,
      y1: null
    });
  }

  mouseUpHandler(event) {
    event.persist();
    // console.log("mouse up");
    // console.log(event);
    this.refreshState();
    this.incrementToNextBoxId();
    // console.log(this.state.x1 + ", " + this.state.y1);
  }

  getCommittedBoxes() {
    return [];
  }

  render() {
    // TODO: get committed rectangles from Redux store
    var committedBoxes = this.getCommittedBoxes();
    
    // get coords for current rectangle
    if (this.state.x0 !== null) {
      var rectangle = {
        x0: this.state.x0,
        x1: this.state.x1,
        y0: this.state.y0,
        y1: this.state.y1
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
