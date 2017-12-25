import React, { Component } from "react";
import axios from 'axios';
var env = process.env.NODE_ENV;
var config = require("../config.json");
const queryString = require('query-string');
var qs = require('qs');

export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.submitTask = this.submitTask.bind(this);
    this.getSubmissionUrl = this.getSubmissionUrl.bind(this);
    this.getNormalizedBoxes = this.getNormalizedBoxes.bind(this);
    this.normalizePosition = this.normalizePosition.bind(this);
    this.parsed = queryString.parse(this.props.location.search);
  }

  hasAcceptedTask() {
    return this.parsed.assignmentId !== "ASSIGNMENT_ID_NOT_AVAILABLE";
  }

  /*
   * Return an Array of normalized box positions. (no id)
   */
  getNormalizedBoxes() {
    const normalizedBoxes = [];
    for (var key in this.props.boundingBoxes) {
      const box = this.props.boundingBoxes[key].position;
      const normalizedBox = this.normalizePosition(box);
      normalizedBoxes.push(normalizedBox);
    }
    return normalizedBoxes;
  }

  normalizePosition(position) {
    const { top, left, width, height } = position;
    // console.log(top, left, width, height);
    const normalizedPosition = {
      top: top / this.props.imageHeight,
      left: left / this.props.imageWidth,
      width: width / this.props.imageWidth,
      height: height / this.props.imageHeight
    };
    // round to 2 decimal places
    for (var key in normalizedPosition) {
      normalizedPosition[key] = normalizedPosition[key].toFixed(2);
    }
    // console.log(normalizedPosition);
    return normalizedPosition;
  }

  submitTask(e) {
    // e.preventDefault();
    console.log('POSTing data');
    axios
      .post(`${this.getSubmissionUrl()}`, {
 
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  createInputElement() {
    var value, inputElement;
    if (this.hasAcceptedTask()) {
      if (this.props.hasDrawnBox) {
        value = "Submit";
        inputElement = <input type="submit" id="submitButton" value={value} />;
      } else {
        value = "Draw a box first!"
        inputElement = <input type="submit" id="submitButton" value={value} disabled />
      }
    } else {
      value = "You must ACCEPT the HIT before you can submit the results.";
      inputElement = <input type="submit" id="submitButton" value={value} disabled />;
    }
    return inputElement;
  }

  getSubmissionUrl() {
    return config["submit"][env] + qs.stringify(
      {
        boundingBoxes: this.getNormalizedBoxes(),
        assignmentId: this.parsed.assignmentId
      },
      { addQueryPrefix: true });
  }

  render() {
    const submissionUrl = this.getSubmissionUrl();
    const inputElement = this.createInputElement();

    return (
      <div id="Submit">
        <form type="submit" method="POST" action={submissionUrl}>
          {inputElement}
        </form>
      </div>
    );
  }
}
