import React, { Component } from "react";
import Instruction from "./Instruction.js";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="Header" className="unselectable">
        <Instruction text={this.props.instruction} />
      </div>
    );
  }
}
