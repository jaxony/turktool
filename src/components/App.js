import React, { Component } from "react";
import Header from "./Header";
import LabelViewContainer from "../containers/LabelViewContainer";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="AppContainer">
        <Header />
        <LabelViewContainer imageURL={this.props.imageURL} />
      </div>
    );
  }
}

export default App;
