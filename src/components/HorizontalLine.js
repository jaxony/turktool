import React, { Component } from "react";

export default class HorizontalLine extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="horizontalLine" className="line" style={{
        top: this.props.y - this.props.imageProps.offsetY,
        width: this.props.imageProps.width
      }}></div>
    );
  }
}