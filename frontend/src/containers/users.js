import React, { Component } from 'react';
import List from '@material-ui/core/List';

import axios from 'axios'

import User from '../components/users/user'

const API_BASE_URL = 'https://seminar13-adicarry.c9users.io:8081'

class Users extends Component {
    constructor(props) {
      super(props) 
      this.state = {
        users: []
      }
    }

    componentDidMount() {
      axios.get(API_BASE_URL + '/users').then((result) => {
        this.setState({students: result.data.results})
      })
    }

    render() {
      return (
        <div>
        <h1>Users</h1>
        <List>
          {this.state.users.map((user) => <User key={user.id} profile={user} />)}
        </List>
        </div>
      )
    }
  }

export default Users