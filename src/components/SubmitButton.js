import React, { Component } from "react";
var env = process.env.NODE_ENV;
var config = require("../turkConfig.json");

export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const submissionUrl = config["submit"][env];
    const value = this.props.canSubmit
      ? "Submit"
      : "You must ACCEPT the HIT before you can submit the results.";
    return (
      <div id="Submit">
        <div>
          <form name="mturkForm" method="post" action={submissionUrl}>
          {this.props.canSubmit
            ? <input type="submit" id="submitButton" value={value} />
            : <input type="submit" id="submitButton" value={value} disabled />
          }
          </form>
        </div>
      </div>
    );
  }
}
