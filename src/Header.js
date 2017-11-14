import React, { Component } from "react";
import Instruction from "./Instruction.js";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  header() {
    return (
      <div className="Header">
        <Instruction text={this.props.instruction} />
      </div>
    );
  }

  render() {
    return this.header();
  }
}