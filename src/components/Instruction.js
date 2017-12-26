import React, { Component } from "react";

export default class Instruction extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <p>
        Draw <strong>accurate</strong> boxes around <strong>every</strong> CAT.<br />
        Please make sure the boxes are as <strong>tight</strong> as possible.
      </p>
    );
  }
}