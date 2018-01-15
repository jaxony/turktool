import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";
import AppContainer from "./containers/AppContainer";
import turktoolApp from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import config from "./config";

let store = createStore(turktoolApp);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route
        path={config["server"] === null ? "/" : "/:taskId"}
        component={AppContainer}
      />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
