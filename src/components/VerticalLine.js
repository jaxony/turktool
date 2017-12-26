import React, { Component } from "react";

export default class VerticalLine extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="verticalLine" className="line" style={{
        left: this.props.x - this.props.imageProps.offsetX,
        height: this.props.imageProps.height
      }}></div>
    );
  }
}