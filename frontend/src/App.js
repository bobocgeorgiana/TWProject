import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
    <li><a href="/auth/google">Login</a></li>
    <li><a href="/logout">Logout</a></li>
</ul>
      </div>
    );
  }
}

export default App;
