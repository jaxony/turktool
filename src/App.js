import React, { Component } from "react";
import Img from "react-image";
import "./App.css";

class Instruction extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return <p>{this.props.text}</p>;
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  header() {
    return (
      <div className="Header">
        <Instruction text={this.props.instruction} />
      </div>
    );
  }

  render() {
    return this.header();
  }
}

class LabelImage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isDrawing: false,
      currentBoxId: -1,
      mouseX: null,
      mouseY: null
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
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
    if (isDrawing)
      return lastBoxId;
    return lastBoxId + 1;
  }

  mouseDownHandler(e) {
    e.persist();
    console.log("mouse down");
    console.log(e);
    this.setState(prevState => ({
      isDrawing: true,
      currentBoxId: this.updateCurrentBoxId(
        prevState.isDrawing, prevState.currentBoxId),
      mouseX: e.pageX,
      mouseY: e.pageY
    }));
    console.log(this.state);
  }

  mouseUpHandler(e) {
    e.persist();
    console.log("mouse up");
    console.log(e);
    this.setState(prevState => ({
      isDrawing: false,
      currentBoxId: this.updateCurrentBoxId(
        prevState.isDrawing, prevState.currentBoxId),
      mouseX: e.pageX,
      mouseY: e.pageY
    }));
    console.log(this.state);
  }

  clickHandler(e) {
    console.log("click");
  }

  render() {
    return (
      <Img
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        // onClick={this.clickHandler}
        className="ImageToLabel"
        src={this.props.imageUrl}
        alt=""
      />
    );
  }
}

class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <LabelImage imageUrl={this.props.imageUrl} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Header instruction="Draw bounding boxes around every chess piece." />
        <LabelView imageUrl={require("./checkmate.jpg")} />
      </div>
    );
  }
}

export default App;
