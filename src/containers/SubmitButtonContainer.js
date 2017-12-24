import React, { Component } from "react";
import { connect } from "react-redux";
import SubmitButton from "../components/SubmitButton.js";
import axios from "axios";
import { withRouter } from "react-router-dom";

var config = require("../config.json");
var env = process.env.NODE_ENV;

const mapStateToProps = (state, ownProps) => {
  const committedBoxes = state.committedBoxes.present;
  return {
    hasDrawnBox: Object.keys(committedBoxes).length > 0,
    boundingBoxes: committedBoxes,
    taskId: ownProps.taskId,
    imageHeight: state.imageProps.height,
    imageWidth: state.imageProps.width
  };
};

const SubmitButtonContainer = withRouter(
  connect(mapStateToProps)(SubmitButton)
);

export default SubmitButtonContainer;
