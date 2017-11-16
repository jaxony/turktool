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
      position: null
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
      startY: event.pageY,
      currX: event.pageX,
      currY: event.pageY
    }));
  }

  updateRectangle(event) {
    this.setState(prevState => ({
      currX: event.pageX,
      currY: event.pageY
    }));
  }

  mouseMoveHandler(event) {
    // only update the state if is drawing
    if (!this.state.isDrawing) return;
    // console.log("move");
    event.persist();
    // console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    this.updateRectangle(event);
    // console.log(this.state.x1 + ", " + this.state.y1);
  }

  incrementToNextBoxId(event) {
    console.log("New box id = " + (this.state.currentBoxId + 1));
    this.setState(prevState => ({
      currentBoxId: prevState.currentBoxId + 1
    }));
  }

  refreshState() {
    // set drawing back to false
    // turn all coordinates back to null
    this.setState({
      isDrawing: false,
      startX: null,
      startY: null,
      currX: null,
      currY: null
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

  calculateRectPosition() {
    const left = Math.min(this.state.startX, this.state.currX);
    const top = Math.min(this.state.startY, this.state.currY);
    const right = Math.max(this.state.startX, this.state.currX);
    const bottom = Math.max(this.state.startY, this.state.currY);
    return {
      left: left,
      top: top,
      width: right - left,
      height: bottom - top
    };
  }

  render() {
    // TODO: get committed rectangles from Redux store
    var committedBoxes = this.getCommittedBoxes();
    
    // get coords for current rectangle
    if (this.state.startX != null) {
      committedBoxes.push({
        id: this.state.currentBoxId,
        position: this.calculateRectPosition()
      });
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
