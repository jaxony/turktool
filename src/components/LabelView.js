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
    this.committedBoxes = [];
  }

  getDocumentRelativeElementOffset(el) {
    const rootEl = this.getRootOfEl(el);
    const { left: docLeft, top: docTop } = rootEl.getBoundingClientRect();

    const {
      left: elLeft,
      top: elTop,
      width: w,
      height: h
    } = el.getBoundingClientRect();

    return {
      x: Math.abs(docLeft) + elLeft,
      y: Math.abs(docTop) + elTop,
      h,
      w
    };
  }

  getRootOfEl(el) {
    if (el.parentElement) {
      return this.getRootOfEl(el.parentElement);
    }
    return el;
  }

  calculateOffset() {
    // from react-cursor-position
    // https://github.com/ethanselzer/react-cursor-position/blob/master/src/ReactCursorPosition.js
    const { x, y, w, h } = this.getDocumentRelativeElementOffset(this.el);
    this.elementOffset = { x, y };
  }

  onImgLoad({ target: img }) {
    console.log("Image loaded");
    // console.log(img.offsetHeight, img.offsetWidth);
    this.setState({
      img: {
        height: img.offsetHeight - 3,
        width: img.offsetWidth - 3
      }
    });

    this.calculateOffset();
  }

  getCommittedBoxes() {
    return this.committedBoxes;
  }

  calculateRectPosition() {
    var left = Math.min(this.props.state.startX, this.props.state.currX);
    var top = Math.min(this.props.state.startY, this.props.state.currY);
    var right = Math.max(this.props.state.startX, this.props.state.currX);
    var bottom = Math.max(this.props.state.startY, this.props.state.currY);

    // limit rectangles to the size of the image
    left = Math.max(this.elementOffset.x, left);
    top = Math.max(this.elementOffset.y, top);
    right = Math.min(this.state.img.width + this.elementOffset.x, right);
    bottom = Math.min(this.state.img.height + this.elementOffset.y, bottom);

    return {
      left: left - this.elementOffset.x,
      top: top - this.elementOffset.y,
      width: right - left,
      height: bottom - top
    };
  }

  isRectangleTooSmall(position) {
    if (position.width < 20 || position.height < 20)
      return true;
    return false;
  }

  render() {
    // TODO: get committed rectangles from Redux store
    var boxesToRender = this.committedBoxes.splice(0);
    // console.log(boxesToRender);
    // get coords for current rectangle
    if (this.props.state.startX != null) {
      const newBox = {
        id: this.props.state.currentBoxId,
        position: this.calculateRectPosition()
      }
      boxesToRender.push(newBox);
      if (!this.props.state.isDrawing && !this.isRectangleTooSmall(newBox.position)) {
        // drawing has ended, and coord is not null,
        // so this rectangle can be committed permanently
        console.log("commit box");
        // this.committedBoxes.push(newBox);
      }
    }

    const numBoxesToRender = boxesToRender.length;

    return (
      <div className="LabelView">
        {numBoxesToRender > 0 && (
          <BoundingBoxes className="BoundingBoxes" boxes={boxesToRender} />
        )}
        <img
          id="LabelViewImg"
          src={this.props.imageUrl}
          alt=""
          onLoad={this.onImgLoad}
          ref={(el) => this.el = el}
        />
      </div>
    );
  }
}
