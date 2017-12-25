import React, { Component } from "react";
import { connect } from "react-redux";
import BoundingBox from "./BoundingBox.js";
import BoundingBoxes from "./BoundingBoxes.js";
import SubmitButton from "../components/SubmitButton.js";
import Crosshair from "../components/Crosshair.js";
import { setImageProps } from "../actions";
import { calculateRectPosition } from "../utils/drawing";
import axios from "axios";
import { withRouter } from "react-router-dom";
const config = require('../config');
const queryString = require('query-string');

/**
 * `LabelView` is a container for `LabelImage` and
 * `BoundingBoxes` components.
 */
class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.onImgLoad = this.onImgLoad.bind(this);
    this.setDimensions = this.setDimensions.bind(this);
    this.loadImageUrl = this.loadImageUrl.bind(this);

    // create axios instance for API calls
    this.backend = axios.create({
      baseURL: config["server"][process.env.NODE_ENV] + '/boxes'
    });

    // initialize state
    this.state = {
      imgLoaded: false,
      imageUrl: null
    };
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    window.addEventListener("resize", this.setDimensions);
    this.loadImageUrl();
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.setDimensions);
  }

  loadImageUrl() {
    const parsed = queryString.parse(this.props.location.search);
    this.backend.get(`/${this.props.taskId}?hitId=${parsed.hitId}&workerId=${parsed.workerId}&assignmentId=${parsed.assignmentId}`)
      .then(res => {
        console.log(res);
        const imageUrl = res.data.imageUrl;
        this.setState({
          imageUrl: imageUrl
        });
      })
      .catch(err => {
        console.log(err);
      });
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
    this.height = img.offsetHeight;
    this.width = img.offsetWidth;
    this.setDimensions();
  }

  setDimensions() {
    const { offsetX, offsetY } = this.calculateOffset();
    this.props.setImageProps(this.height, this.width, offsetX, offsetY);
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
          this.props.currentBox
        )
      });
    }

    return (
      <div id="LabelView">
        {boxesToRender.length > 0 && (
          <BoundingBoxes
            className="BoundingBoxes unselectable"
            boxes={boxesToRender}
          />
        )}
        <div>
          <img
            id="LabelViewImg"
            className="unselectable"
            src={this.state.imageUrl}
            alt=""
            onLoad={this.onImgLoad}
            ref={el => (this.el = el)}
          />
          {/*<Crosshair />*/}
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LabelView));
