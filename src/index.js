import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './components/App';
import turktoolApp from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";

let store = createStore(turktoolApp);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path='/:taskId' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
