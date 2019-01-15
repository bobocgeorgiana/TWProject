import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './containers/index'
import Login from './containers/login'
import Header from './components/header'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Router>
          <div>
          <Header />
            <div style={{padding:'10px'}}>
              <Route path="/" exact component={Index} />
              <Route path="/secret" component={Login} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
