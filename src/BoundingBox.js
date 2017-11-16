import React, { Component } from "react";

export default class BoundingBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var style = this.props.position;
    // style['zIndex'] = 999;
    return (
      <div className="BoundingBox" style={style}></div>
    );
  }
}