import React, { Component } from "react";
import Header from "./Header.js";
import LabelView from "./LabelView.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        
        <LabelView imageUrl={require("./checkmate.jpg")} />
      </div>
    );
  }
}

export default App;
