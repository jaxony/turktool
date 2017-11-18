import React, { Component } from "react";
import LabelView from "../components/LabelView";

export default class LabelViewContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      isDrawing: false,
      commitBox: false,
      currentBoxId: 0,
      currX: null,
      currY: null
    };
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
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

  refreshState() {
    // set drawing back to false
    // turn all coordinates back to null
    this.setState({
      commitBox: true,
      isDrawing: false,
      startX: null,
      startY: null,
      currX: null,
      currY: null
    });
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
    if (!this.state.isDrawing) return;
    // console.log("App: move");
    event.persist();
    this.updateRectangle(event);
  }

  mouseUpHandler(event) {
    // console.log("App: mouse up");
    this.setState(prevState => ({
      isDrawing: false,
      currentBoxId: prevState.isDrawing
        ? prevState.currentBoxId + 1 // was drawing
        : prevState.currentBoxId // was not drawing
    }));
  }

  render() {
    return (
      <div
        id="LabelViewContainer"
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        <LabelView imageUrl={this.props.imageUrl} state={this.state} />
      </div>
    );
  }
}
