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
  }

  hasAcceptedTask(search) {
    const parsed = queryString.parse(search);
    return parsed.assignmentId !== "ASSIGNMENT_ID_NOT_AVAILABLE";
  }

  normalizeBoxPosition(position) {

  }

  submitTask(e) {
    const parsed = queryString.parse(this.props.location.search);
    e.preventDefault();
    console.log('POSTing data');
    axios
      .post(`${config["server"][env]}/boxes/${this.props.taskId}`, {
        boundingBoxes: this.props.boundingBoxes,
        assignmentId: parsed.assignmentId,
        workerId: parsed.workerId,
        hitId: parsed.hitId
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  createInputElement() {
    if (this.hasAcceptedTask(this.props.location.search)) {
      if (this.props.hasDrawnBox) {
        const value = "Submit";
        var inputElement = <input type="submit" id="submitButton" value={value} />;
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

  getSubmissionUrl() {
    const normalizedBoundingBoxes = this.normalizeBoxPosition();

    return config["submit"][env] + qs.stringify(this.props.boundingBoxes, { addQueryPrefix: true, arrayLimit: 0 });
  }

  render() {
    console.log('h,w: ', this.props.imageHeight, this.props.imageWidth);
    const submissionUrl = this.getSubmissionUrl();
    const inputElement = this.createInputElement();

    return (
      <div id="Submit">
        <div id="SubmissionForm">
          <form name="mturkForm" method="post" action={submissionUrl}>
          
          {/*<form name="mturkForm">*/}
            {inputElement}
          </form>
        </div>
      </div>
    );
  }
}
