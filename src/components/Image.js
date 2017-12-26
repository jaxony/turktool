import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import queryString from "qs";

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.onImgLoad = this.onImgLoad.bind(this);
    this.setDimensions = this.setDimensions.bind(this);
    this.loadImageUrl = this.loadImageUrl.bind(this);
    this.state = {
      imageUrl: null
    }

    // create axios instance for API calls
    this.backend = axios.create({
      baseURL: config["server"][process.env.NODE_ENV] + "/boxes"
    });
  }

   /**
   * Add event listener
   */
  componentDidMount() {
    window.addEventListener("resize", this.setDimensions);
    this.loadImageUrl();
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.setDimensions);
  }

  loadImageUrl() {
    const parsed = queryString.parse(this.props.location.search);
    this.backend.get(`/${this.props.taskId}?hitId=${parsed.hitId}&workerId=${parsed.workerId}&assignmentId=${parsed.assignmentId}`)
      .then(res => {
        console.log(res);
        const imageUrl = res.data.imageUrl;
        this.setState({
          imageUrl: imageUrl
        });
      })
      .catch(err => {
        console.log(err);
      });
    }


  getDocumentRelativeElementOffset(el) {
    const rootEl = this.getRootOfEl(el);
    const { left: docLeft, top: docTop } = rootEl.getBoundingClientRect();

    const {
      left: elLeft,
      top: elTop,
      width: w,
      height: h
    } = el.getBoundingClientRect();

    return {
      x: Math.abs(docLeft) + elLeft,
      y: Math.abs(docTop) + elTop,
      h,
      w
    };
  }

  getRootOfEl(el) {
    if (el.parentElement) {
      return this.getRootOfEl(el.parentElement);
    }
    return el;
  }

  calculateOffset() {
    // from react-cursor-position
    // https://github.com/ethanselzer/react-cursor-position/blob/master/src/ReactCursorPosition.js
    const { x, y } = this.getDocumentRelativeElementOffset(this.el);
    return { offsetX: x, offsetY: y };
  }

  onImgLoad({ target: img }) {
    console.log("Image loaded");
    this.height = img.offsetHeight;
    this.width = img.offsetWidth;
    this.setDimensions();
  }

  setDimensions() {
    const { offsetX, offsetY } = this.calculateOffset();
    this.props.setImageProps(this.height, this.width, offsetX, offsetY);
  }

  render() {
    return (
      <img
        id="LabelViewImg"
        className="unselectable"
        src={this.state.imageUrl}
        alt=""
        onLoad={this.onImgLoad}
        ref={el => (this.el = el)}
      />
    );
  }
}