import React, { Component } from "react";

export default class DeleteBoxButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log("Delete box " + this.props.boxId);
    this.props.deleteBox(this.props.boxId);
  }

  render() {
    return (
      <div className="DeleteBoxButton" onClick={this.clickHandler}>
        X
      </div>
    );
  }
}