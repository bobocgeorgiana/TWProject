import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './containers/index'
import Login from './containers/login'
import Header from './components/header'
import Events from './containers/events'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Router>
          <div>
          <Header />
            <div style={{padding:'10px'}}>
              <Route path="/" exact component={Index} />
              <Route path="/users" component={Login} />
              <Route path="/events" component={Events}/>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
