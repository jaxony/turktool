import React, { Component } from "react";
var env = process.env.NODE_ENV;
var config = require("../config.json");

export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  createInputElement() {
    if (this.props.hasAcceptedTask) {
      if (this.props.hasDrawnBox) {
        const value = "Submit";
        var inputElement = <input type="submit" id="submitButton" value={value} onClick={this.props.submitTask} />;
      } else {
        const value = "Draw a box first!"
        var inputElement = <input type="submit" id="submitButton" value={value} disabled />
      }
    } else {
      const value = "You must ACCEPT the HIT before you can submit the results.";
      var inputElement = <input type="submit" id="submitButton" value={value} disabled />;
    }
    return inputElement;
  }

  render() {
    const submissionUrl = config["submit"][env];
    const inputElement = this.createInputElement();

    return (
      <div id="Submit">
        <div>
          <form name="mturkForm" method="post" action={submissionUrl}>
          {/*<form name="mturkForm">*/}
            {inputElement}
          </form>
        </div>
      </div>
    );
  }
}
