import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './containers/index'
import Header from './components/header'
import Events from './containers/events'
import About from './containers/about'
import Users from './containers/users'
import Teams from './containers/teams'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Router>
          <div>
          <Header />
            <div style={{padding:'10px'}}>
              <Route path="/" exact component={Index} />
              <Route path="/users" component={Users} />
              <Route path="/events" component={Events}/>
              <Route path="/about" component={About}/>
              <Route path="/teams" component={Teams}/>
              
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
