import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './components/index'
import Login from './components/login'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Router>
          <div>
            <div style={{padding:'10px'}}>
              <Route path="/" exact component={Login} />
              <Route path="/secret" component={Index} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
