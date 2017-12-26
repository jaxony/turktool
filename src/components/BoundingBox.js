import React, { Component } from "react";
import DeleteBoxButtonContainer from "../containers/DeleteBoxButtonContainer";

export default class BoundingBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    this.state = {
      mouseOver: false
    };
  }

  mouseOverHandler() {
    if (!this.state.mouseOver && !this.props.isDrawing) {
      setTimeout(() => {
        this.setState({ mouseOver: true });
      }, 200);
    }
  }

  mouseLeaveHandler() {
    this.setState({ mouseOver: false });
  }

  render() {
    return (
      <div
        className="BoundingBox"
        style={this.props.box.position}
        onMouseOver={this.mouseOverHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        {this.state.mouseOver && <DeleteBoxButtonContainer boxId={this.props.box.id} />}
      </div>
    );
  }
}
