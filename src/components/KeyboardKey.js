import React, { Component } from "react";

export default class KeyboardKey extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div class="KeyboardKey">
        {this.props.symbol}
      </div>
    );
  }
}