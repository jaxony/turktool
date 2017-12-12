import React, { Component } from "react";
import Line from "./Line.js";

export default class Crosshair extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="Crosshair" class="unselectable">
        <Line lineType="vertical" />
        <Line lineType="horizontal" />
      </div>
    );
  }
}