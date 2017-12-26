import React, { Component } from "react";
import BoundingBoxes from "./BoundingBoxes";
import ImageContainer from "../containers/ImageContainer";
import Crosshair from "../components/Crosshair.js";
import { calculateRectPosition, isRectangleTooSmall } from "../utils/drawing";

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
    this.getCurrentBox = this.getCurrentBox.bind(this);
    this.refreshDrawing = this.refreshDrawing.bind(this);

    this.state = {
      isDrawing: false,
      currentBoxId: 0,
      startX: null,
      startY: null,
      currX: null,
      currY: null,
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

  getCurrentBox() {
    return {
      startX: this.state.startX,
      startY: this.state.startY,
      currX: this.state.currX,
      currY: this.state.currY
    };
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
    this.setState({
      isDrawing: true,
      startX: event.pageX,
      startY: event.pageY,
      currX: event.pageX,
      currY: event.pageY
    });
  }

  updateRectangle(event) {
    this.setState({
      currX: event.pageX,
      currY: event.pageY
    })
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
    if (!this.state.isDrawing) return;

    event.persist();
    this.updateRectangle(event);
  }

  mouseUpHandler(event) {
    // console.log(this.props.imageProps);
    // console.log("up");
    const boxPosition = calculateRectPosition(
      this.props.imageProps,
      this.getCurrentBox()
    );
    if (this.state.isDrawing && !isRectangleTooSmall(boxPosition)) {
      // drawing has ended, and coord is not null,
      // so this rectangle can be committed permanently
      this.props.commitDrawingAsBox(
        this.state.currentBoxId,
        boxPosition
      );
    }
    this.refreshDrawing();
  }

  refreshDrawing() {
    this.setState((prevState) => {
      return {
        ...prevState,
        isDrawing: false,
        currentBoxId: prevState.isDrawing
          ? prevState.currentBoxId + 1
          : prevState.currentBoxId,
        startX: null,
        startY: null,
        currX: null,
        currY: null
      }
    });
  }

  // currentBoxId: state.isDrawing
  //         ? state.currentBoxId + 1
  //         : state.currentBoxId,

  render() {
    // console.log("re-render LabelView");
    // TODO: get committed rectangles from Redux store
    const boxes = this.props.committedBoxes;
    var boxesToRender = Object.keys(boxes).reduce((result, key) => {
      result.push(boxes[key]);
      return result;
    }, []);

    if (this.state.startX != null) {
      boxesToRender.push({
        id: this.state.currentBoxId,
        position: calculateRectPosition(
          this.props.imageProps,
          this.getCurrentBox()
        )
      });
    }

    return (
      <div id="LabelViewContainer">
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
              isDrawing={this.state.isDrawing}
            />
          )}
          <ImageContainer taskId={this.props.taskId}/>
        </div>
      </div>
    );
  }
}

export default LabelView;
