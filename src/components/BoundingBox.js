import React, { Component } from "react";
import DeleteBoxButtonContainer from "../containers/DeleteBoxButtonContainer";

export default class BoundingBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    // console.log(this.props.box.position);
    return (
      <div className="BoundingBox" style={this.props.box.position}>
        <DeleteBoxButtonContainer boxId={this.props.box.id} />
      </div>
    );
  }
}