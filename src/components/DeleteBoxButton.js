import React, { Component } from "react";

export default class DeleteBoxButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="DeleteBoxButton">
        X
      </div>
    );
  }
}