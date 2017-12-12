import React, { Component } from "react";

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var style = {
      top: 50,
      left: 100,
      width: this.props.lineType === "vertical"
        ? 0 : 750,
      height: this.props.lineType === "vertical"
        ? 500 : 0,
      "border-top": "1px green",
      "border-left": "1px green"
    };

    return (
      <div class="line" style={style} />
    );
  }
}