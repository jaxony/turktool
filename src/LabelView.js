import React, { Component } from "react";
import LabelImage from "./LabelImage.js";

export default class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <LabelImage imageUrl={this.props.imageUrl} />
      </div>
    );
  }
}