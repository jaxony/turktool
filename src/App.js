import React, { Component } from "react";
import logo from "./logo.svg";
import img from "./checkmate.jpg"
import "./App.css";

class Instruction extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    console.log(this.props.text);
    return <p>{this.props.text}</p>;
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  header() {
    return (
      <div className="Header">
        <Instruction text={this.props.instruction} />
      </div>
    );
  }

  render() {
    return this.header();
  }
}

class SourceImage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <img className="ImageToLabel" src={this.props.imageUrl} alt="" />
    );
  }
}

class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <SourceImage imageUrl={this.props.imageUrl} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Header instruction="Draw bounding boxes around every chess piece." />
        <LabelView imageUrl={img} />
      </div>
    );
  }
}

export default App;
