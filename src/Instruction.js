import React, { Component } from "react";

export default class Instruction extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return <p>{this.props.text}</p>;
  }
}