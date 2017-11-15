import React, { Component } from "react";
import Img from "react-image";

export default class LabelImage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Img className="ImageToLabel" src={this.props.imageUrl} alt="" />
    );
  }
}