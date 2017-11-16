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
      position: {
        left: event.pageX,
        top: event.pageY,
        width: 0,
        height: 0
      }
    }));
  }

  /**
   * Calculate the start position and size of the rectangle by
   * the mouse coordinates
   *
   * @param   startX
   * @param   startY
   * @param   endX
   * @param   endY
   * @returns {*}
   */
  calculateRectPos(startX, startY, endX, endY) {
    var width = endX - startX;
    var height = endY - startY;
    var posX = startX;
    var posY = startY;

    if (width < 0) {
      width = Math.abs(width);
      posX -= width;
    }

    if (height < 0) {
      height = Math.abs(height);
      posY -= height;
    }

    return {
      left: posX,
      top: posY,
      width: width,
      height: height
    };
  }

  updateRectangle(event) {
    this.setState(prevState => ({
      position: this.calculateRectPos(
        prevState.position.left, 
        prevState.position.top, 
        event.pageX, //.nativeEvent.offsetX,
        event.pageY) //.nativeEvent.offsetY)
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
      position: null
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
    if (this.state.position != null) {
      committedBoxes.push({
        id: this.state.currentBoxId,
        position: this.state.position
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
