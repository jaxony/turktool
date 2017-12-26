import React, { Component } from "react";
import Line from "./Line.js";

export default class Crosshair extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
  }

  mouseMoveHandler() {
    console.log('move');
  }

  mouseOverHandler() {
    console.log('over');
  }

  render() {
    return (
      <div
        id="Crosshair"
        className="unselectable"
        onMouseOver={this.mouseOverHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        <Line lineType="vertical" />
        <Line lineType="horizontal" />
      </div>
    );
  }
}
