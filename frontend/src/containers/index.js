
import React, { Component } from "react";
import moment from "moment";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      this.tick();
    }, 1000);
   
  };

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  render() {
    const{ time } = this.state;

    return (
    
        <div>
         <h1 id ="myCalendar">GALA Event Planner</h1>  
          <div className="current-time">{time}, 2018</div>
          <a id="addEvent"
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=cHFhNWY2ZDlqMTJ1dGY0YnVqN2Nsamx2aDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            //target="_blank"
          >
            +
          </a>
            <p3>@GALA Tech</p3>
      </div>
    );
  }
}
