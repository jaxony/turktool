import React, { Component } from "react";
import KeyboardKey from "./KeyboardKey";

export default class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="InfoPanel">
        <table>
          <tbody>
            <tr>
              <td><KeyboardKey symbol={"Z"} /></td>
              <td>Undo</td> 
            </tr>
            <tr>
              <td><KeyboardKey symbol={"X"} /></td>
              <td>Redo</td> 
            </tr>
            <tr>
              <td><KeyboardKey symbol={"C"} /></td>
              <td>Toggle cross</td> 
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

