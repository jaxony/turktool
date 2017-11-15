import React, { Component } from "react";
import LabelImage from "./LabelImage.js";
import BoundingBoxes from "./BoundingBoxes.js";

/**
 * `LabelView` is a container for `LabelImage` and
 * `BoundingBoxes` components.
 */
export default class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var rectangle = {
      x0: 10, y0: 140, x1: 300, y1: 200
    };
    return (
      <div className="LabelView">
        <BoundingBoxes className="BoundingBoxes" rectangle={rectangle} />
        <LabelImage className="LabelImage" imageUrl={this.props.imageUrl} />
      </div>
    );
  }
}