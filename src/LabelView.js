import React, { Component } from "react";
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
    this.onImgLoad = this.onImgLoad.bind(this);
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

  onImgLoad({target: img}) {
    console.log("Image loaded");
    console.log(img.offsetHeight, img.offsetWidth);
    this.setState({
      img: {
        height: img.offsetHeight - 3,
        width: img.offsetWidth - 3
      }
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
    var left = Math.min(this.state.startX, this.state.currX);
    var top = Math.min(this.state.startY, this.state.currY);
    var right = Math.max(this.state.startX, this.state.currX);
    var bottom = Math.max(this.state.startY, this.state.currY);

    // limit rectangles to the size of the image
    left = Math.max(0, left);
    top = Math.max(0, top);
    right = Math.min(this.state.img.width, right);
    bottom = Math.min(this.state.img.height, bottom);

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
        {numBoxesToRender > 0 && (
          <BoundingBoxes className="BoundingBoxes" boxes={committedBoxes} />
        )}
        <img
          id="LabelViewImg"
          src={this.props.imageUrl}
          alt=""
          onLoad={this.onImgLoad}
        />
      </div>
    );
  }
}
