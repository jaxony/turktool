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
      <div id="App">
        {this.props.showHeader === true && <Header />}
        <LabelViewContainer
          imageURL={this.props.imageURL}
          showSidePanel={this.props.showSidePanel}
        />
      </div>
    );
  }
}

export default App;
