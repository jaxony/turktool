import React, { Component } from "react";
import DeleteBoxButton from "./DeleteBoxButton";

export default class BoundingBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="BoundingBox" style={this.props.position}>
        <DeleteBoxButton />
      </div>
    );
  }
}