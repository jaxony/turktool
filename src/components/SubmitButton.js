import React, { Component } from "react";
import axios from "axios";
var env = process.env.NODE_ENV;
var config = require("../config.json");
const queryString = require("query-string");
var qs = require("qs");

export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.submitTask = this.submitTask.bind(this);
    this.getSubmissionUrl = this.getSubmissionUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNormalizedBoxes = this.getNormalizedBoxes.bind(this);
    this.normalizePosition = this.normalizePosition.bind(this);
    this.parsed = queryString.parse(this.props.location.search);
  }

  hasAcceptedTask() {
    if (this.parsed.assignmentId === undefined)
      return false;
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

  handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('submitButton');
    input.setAttribute('value', JSON.stringify(this.getNormalizedBoxes()));
    console.log(input);
    const form = document.getElementById('submitForm');
    HTMLFormElement.prototype.submit.call(form);
    
  }

  submitTask(e) {
    // e.preventDefault();
    console.log("POSTing data");
    axios
      .post(`${this.getSubmissionUrl()}`, {})
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  createInputElement() {
    if (this.hasAcceptedTask()) {
      if (this.props.hasDrawnBox)
        return (
          <button
            name="boundingBoxes"
            type="submit"
            id="submitButton"
            value={JSON.stringify(this.getNormalizedBoxes())}
            ref={value => {
              this.value = value;
            }}
          >Submit</button>
        );
      else
        return (
          <button
            name="boundingBoxes"
            type="submit"
            id="submitButton"
            disabled
          >Draw a box first!</button>
        );
    } else {
      return (
        <button
          name="boundingBoxes"
          type="submit"
          id="submitButton"
          disabled
        >Cannot Submit! Accept HIT.</button>
      );
    }
  }

  getSubmissionUrl() {
    const url = config["submit"][env] + "/?assignmentId=" + this.parsed.assignmentId;
    console.log(url);
    return url;
  }

  render() {
    const inputElement = this.createInputElement();

    return (
      <div id="Submit">
        <form
          id="submitForm"
          type="submit"
          method="POST"
          action={this.getSubmissionUrl()}
        >
          {inputElement}
        </form>
      </div>
    );
  }
}
