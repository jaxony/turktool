import React, { Component } from "react";

export default class BoundingBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { x0, y0, x1, y1 } = this.props.box;
    const style = {
      left: x0,
      top: y0,
      width: x1 - x0,
      height: y1 - y0,
      zIndex: 999
    };
    return (
      <div className="BoundingBox" style={style}></div>
    );
  }
}