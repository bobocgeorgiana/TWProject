import React, { Component } from 'react';

class Player extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      firstName : this.props.item.firstName,
      lastName : this.props.item.lastName,
      age : this.props.item.age
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }
  }
  render() {
    if (this.state.isEditing){
      return (
        <div>
          Numele jucatorului este
          <input type="text" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName} /> 
           <input type="text" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName} /> 
          si are
          <input type="text" id="age" name="age" onChange={this.handleChange} value={this.state.age} /> ani.
          <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
          <input type="button" value="save" onClick={() => {
              this.props.onSave(this.props.item.id, {
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                age : this.state.age
              })
              this.setState({isEditing : false})
            }
          } />
        </div>
      )
    }
    else{
      return (
        <div>
    
          Numele jucatorului este {this.props.item.firstName} {this.props.item.lastName} si are {this.props.item.age} ani.
          <input type="button" value="delete" onClick={() => this.props.onDelete(this.props.item.id)} />
          <input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
        </div>
      )
    }
  }
}

export default Player
