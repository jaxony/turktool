import React, { Component } from "react";
import VerticalLine from "./VerticalLine";
import HorizontalLine from "./HorizontalLine";

export default class Crosshair extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
  }

  mouseMoveHandler() {
    // console.log('move');
  }

  mouseOverHandler() {
    // console.log('over');
  }

 

  render() {
    return (
      <div
        id="Crosshair"
        className="unselectable"
        onMouseOver={this.mouseOverHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        <VerticalLine x={this.props.x} imageProps={this.props.imageProps} />
        <HorizontalLine y={this.props.y} imageProps={this.props.imageProps} />
      </div>
    );
  }
}
