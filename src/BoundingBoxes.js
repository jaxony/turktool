import React, { Component } from "react";
import BoundingBox from "./BoundingBox.js";

/**
 * Presentational component:
 * Renders `BoundingBox`s passed in through props.
 */
export default class BoundingBoxes extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    // make BoundingBox component for each box that needs to
    // be rendered
    const boxesToRender = this.props.boxes.map((box, index) =>
      <BoundingBox key={box.id} position={box.position} />
    );
    return (
      <div id="BoundingBoxes">
        {boxesToRender.length > 0 && boxesToRender}
      </div>
    );
  }
}