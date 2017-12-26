import React, { Component } from "react";
import { connect } from "react-redux";
import BoundingBoxes from "./BoundingBoxes";
import ImageContainer from "../containers/ImageContainer";
import Crosshair from "../components/Crosshair.js";
import { setImageProps } from "../actions";
import { calculateRectPosition, isRectangleTooSmall } from "../utils/drawing";
import axios from "axios";
import { withRouter } from "react-router-dom";
const config = require("../config");
const queryString = require("query-string");

/**
 * `LabelView` is a container for `LabelImage` and
 * `BoundingBoxes` components.
 */
class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.createRectangle = this.createRectangle.bind(this);
    this.updateRectangle = this.updateRectangle.bind(this);

    // create axios instance for API calls
    this.backend = axios.create({
      baseURL: config["server"][process.env.NODE_ENV] + "/boxes"
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
    document.addEventListener("keydown", this.handleKeyPress);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.setDimensions);
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    switch (event.keyCode) {
      case 90:
        console.log("You just pressed Z!");
        if (this.props.canUndo) this.props.onUndo();
        break;
      case 88:
        console.log("You just pressed X!");
        if (this.props.canRedo) this.props.onRedo();
        break;
      default:
        break;
    }
  }

  createRectangle(event) {
    const payload = {
      isDrawing: true,
      startX: event.pageX,
      startY: event.pageY,
      currX: event.pageX,
      currY: event.pageY
    };
    this.props.startDrawing(payload);
  }

  updateRectangle(event) {
    const payload = {
      currX: event.pageX,
      currY: event.pageY
    };
    this.props.updateDrawing(payload);
  }

  mouseDownHandler(event) {
    // console.log("down");
    // only start drawing if the mouse was pressed
    // down inside the image that we want labelled
    if (
      event.target.id !== "LabelViewImg" &&
      event.target.className !== "BoundingBox"
    )
      return;
    event.persist();
    this.createRectangle(event);
  }

  mouseMoveHandler(event) {
    // console.log("move");
    // only update the state if is drawing
    if (!this.props.currentBox.isDrawing) return;

    event.persist();
    this.updateRectangle(event);
  }

  mouseUpHandler(event) {
    // console.log(this.props.imageProps);
    // console.log("up");
    const boxPosition = calculateRectPosition(
      this.props.imageProps,
      this.props.currentBox
    );
    if (this.props.currentBox.isDrawing && !isRectangleTooSmall(boxPosition)) {
      // drawing has ended, and coord is not null,
      // so this rectangle can be committed permanently
      // this.props.onCommitBox(newBox.id, newBox.position);
      this.props.commitDrawingAsBox(
        this.props.currentBox.currentBoxId,
        boxPosition
      );
      // this.committedBoxes.push(newBox);
    }
    this.props.refreshDrawing();
  }

  render() {
    // console.log("re-render LabelView");
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
      <div
        id="LabelView"
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        {boxesToRender.length > 0 && (
          <BoundingBoxes
            className="BoundingBoxes unselectable"
            boxes={boxesToRender}
            isDrawing={this.props.isDrawing}
          />
        )}
        <ImageContainer />
      </div>
    );
  }
}

export default LabelView;
