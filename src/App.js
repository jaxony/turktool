import React, { Component } from "react";
import Header from "./Header.js";
import LabelView from "./LabelView.js";
import "./App.css";

class App extends Component {
  
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isDrawing: false,
      commitBox: false,
      currentBoxId: 0,
      currX: null,
      currY: null
    }
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
    if (event.target.id !== "LabelViewImg")
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
      currentBoxId: prevState.currentBoxId + 1
    }));
  }

  render() {
    return (
      <div
        id="AppContainer"
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        <Header instruction="Draw stuff!" />
        <LabelView imageUrl={require("./checkmate.jpg")} state={this.state} />
      </div>
    );
  }
}

export default App;
