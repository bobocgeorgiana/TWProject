import React, { Component } from 'react';

class Team extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      name : this.props.item.name,
      noPlayers : this.props.item.noPlayers,
      type : this.props.item.type
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
          Numele echipei este 
          <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} /> 
          
           , contine  
          <input type="text" id="noPlayers" name="noPlayers" onChange={this.handleChange} value={this.state.noPlayers} />
           jucatori si este o echipa de 
          <input type="text" id="type" name="type" onChange={this.handleChange} value={this.state.type} />
          <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
          <input type="button" value="save" onClick={() => {
              this.props.onSave(this.props.item.id, {
                name : this.state.name,
                noPlayers : this.state.noPlayers,
                type : this.state.type
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
           Numele echipei este  {this.props.item.name}, contine  {this.props.item.noPlayers} si este de tipul {this.props.item.type}
          <input type="button" value="delete" onClick={() => this.props.onDelete(this.props.item.id)} />
          <input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
          <input type="button" value="select" onClick={() => this.props.onSelect(this.props.item.id)} />
        </div>
      )
    }
  }
}

export default Team
