import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class User extends Component {
    render() {
      let profile = this.props.profile;
      
      return (
        <ListItem>
            <ListItemText>{profile.firstname}</ListItemText>
            <ListItemText>{profile.lastname}</ListItemText>
            <ListItemText>{profile.gmail}</ListItemText>
            <br/>
            
      </ListItem>
      )  
    }
  }

  export default User