import React, { Component } from 'react';
//import moment from "moment";
//import ReactDOM from 'react-dom';

class Index extends Component {
 //    constructor(props) {
//     super(props);
//     this.state = {
//       time: moment().format("dd, Do MMMM, h:mm A"),
//       events: [],
//       isBusy: false,
//       isEmpty: false,
//       isLoading: true
//     };
//   }
  
//   tick = () => {
//                 let time = moment().format("dddd, Do MMMM, h:mm A");
//                 this.setState({
//                 time: time
//                   });
//<p1><a id="signOut" href="/">SIGN OUT</a></p1>
//                  };
       
    render() {
        
      return (<div>
      
      <h1 id ="myCalendar">Event Planner</h1>   
          <br/>
      <p2 id="p2"></p2>
          <a id="addEvent"
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=cHFhNWY2ZDlqMTJ1dGY0YnVqN2Nsamx2aDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            //target="_blank"
          >
            +
          </a>
      <p3>@GALA Tech</p3>
      </div> )
    }
}

// const app = document.getElementById("p2");

// ReactDOM.render(<Layout/>,app);
             
export default Index