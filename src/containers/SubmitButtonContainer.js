import React, { Component } from "react";
import { connect } from "react-redux";
import SubmitButton from "../components/SubmitButton.js";
import axios from "axios";
var config = require("../config.json");
var env = process.env.NODE_ENV;

const mapStateToProps = (state, ownProps) => {
  const HAS_ACCEPTED_ASSIGNMENT = true;
  const committedBoxes = state.committedBoxes.present;
  return {
    hasAcceptedTask: HAS_ACCEPTED_ASSIGNMENT,
    hasDrawnBox: Object.keys(committedBoxes).length > 0,
    submitTask: () => {
      axios.post(config["server"] + '/api/boundingboxes', {
        message: "hello"
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}

const SubmitButtonContainer = connect(
  mapStateToProps
)(SubmitButton)

export default SubmitButtonContainer
