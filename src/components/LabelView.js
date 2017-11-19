import React, { Component } from "react";
import { connect } from "react-redux";
import BoundingBox from "./BoundingBox.js";
import BoundingBoxes from "./BoundingBoxes.js";
import { setImageProps } from "../actions";
import { calculateRectPosition } from "../utils/drawing";

/**
 * `LabelView` is a container for `LabelImage` and
 * `BoundingBoxes` components.
 */
class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.onImgLoad = this.onImgLoad.bind(this);
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
    return { offsetX: x, offsetY: y };
  }

  onImgLoad({ target: img }) {
    console.log("Image loaded");
    const height = img.offsetHeight - 3;
    const width = img.offsetWidth - 3;
    const { offsetX, offsetY } = this.calculateOffset();
    this.props.setImageProps(height, width, offsetX, offsetY);
  }

  render() {
    console.log("re-render LabelView");
    // TODO: get committed rectangles from Redux store
    const boxes = this.props.committedBoxes;
    var boxesToRender = Object.keys(boxes).reduce((result, key) => {
      result.push(boxes[key]);
      return result;
    }, []);

    if (this.props.currentBox.startX != null) {
      boxesToRender.push({
        id: this.props.currentBox.currentBoxId,
        position: calculateRectPosition(
          this.props.imageProps,
          this.props.currentBox)
        }
      );
    }

    return (
      <div id="LabelView">
        {boxesToRender.length > 0 && (
          <BoundingBoxes className="BoundingBoxes" boxes={boxesToRender} />
        )}
        <img
          id="LabelViewImg"
          src={this.props.imageUrl}
          alt=""
          onLoad={this.onImgLoad}
          ref={el => (this.el = el)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    committedBoxes: state.committedBoxes.present,
    currentBox: state.currentBox,
    imageProps: state.imageProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setImageProps: (height, width, offsetX, offsetY) => {
      dispatch(setImageProps(height, width, offsetX, offsetY));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelView);
