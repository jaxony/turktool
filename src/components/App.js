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
        <LabelViewContainer taskId={this.props.match.params.taskId} />
      </div>
    );
  }
}

export default App;
