import React, { Component } from "react";
import Img from "react-image";

export default class LabelImage extends Component {
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
    this.clickHandler = this.clickHandler.bind(this);
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
    this.setState({isDrawing: false});
    console.log(this.state.endX + ", " + this.state.endY);
  }

  clickHandler(event) {
    console.log("click");
  }

  render() {
    return (
      <Img
        className="ImageToLabel"
        src={this.props.imageUrl}
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
        alt=""
      />
    );
  }
}