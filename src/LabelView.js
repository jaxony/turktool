import React, { Component } from "react";
import BoundingBoxes from "./BoundingBoxes.js";

/**
 * `LabelView` is a container for `LabelImage` and
 * `BoundingBoxes` components.
 */
export default class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  refreshState() {
    // set drawing back to false
    // turn all coordinates back to null
    this.setState({
      isDrawing: false,
      startX: null,
      startY: null,
      currX: null,
      currY: null
    });
  }

  onImgLoad({ target: img }) {
    console.log("Image loaded");
    console.log(img.offsetHeight, img.offsetWidth);
    this.setState({
      img: {
        height: img.offsetHeight - 3,
        width: img.offsetWidth - 3
      }
    });
  }

  getCommittedBoxes() {
    return [];
  }

  calculateRectPosition() {
    var left = Math.min(this.props.state.startX, this.props.state.currX);
    var top = Math.min(this.props.state.startY, this.props.state.currY);
    var right = Math.max(this.props.state.startX, this.props.state.currX);
    var bottom = Math.max(this.props.state.startY, this.props.state.currY);

    // limit rectangles to the size of the image
    left = Math.max(0, left);
    top = Math.max(0, top);
    right = Math.min(this.state.img.width, right);
    bottom = Math.min(this.state.img.height, bottom);

    return {
      left: left,
      top: top,
      width: right - left,
      height: bottom - top
    };
  }

  render() {
    // TODO: get committed rectangles from Redux store
    var committedBoxes = this.getCommittedBoxes();

    // get coords for current rectangle
    if (this.props.state.startX != null) {
      committedBoxes.push({
        id: this.props.state.currentBoxId,
        position: this.calculateRectPosition()
      });
    }

    const numBoxesToRender = committedBoxes.length;

    return (
      <div className="LabelView">
        {numBoxesToRender > 0 && (
          <BoundingBoxes className="BoundingBoxes" boxes={committedBoxes} />
        )}
        <img
          id="LabelViewImg"
          src={this.props.imageUrl}
          alt=""
          onLoad={this.onImgLoad}
        />
      </div>
    );
  }
}
