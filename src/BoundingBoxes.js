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
     return (
      <div id="BoundingBoxes">
        <BoundingBox rectangle={this.props.rectangle} />
      </div>
     );
   }
}