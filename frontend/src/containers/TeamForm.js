import React, { Component } from 'react';

class TeamForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      name : '',
      noPlayers : -1,
      type : '',
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }
  }
  render() {
    return (
      <div>
        <form>
          <label for="name">Numele</label>
          <input type="text" id="name" name="name" onChange={this.handleChange} />
        
          <label for="noPlayers">Numar jucatori</label>
          <input type="text" id="noPlayers" name="noPlayers" onChange={this.handleChange} />
          
          <label for="type">Tipul</label>
          <input type="text" id="type" name="type" onChange={this.handleChange} />
          <input type="button" value="add" onClick={() => this.props.onAdd({
            name : this.state.name,
            noPlayers : this.state.noPlayers,
            type : this.state.type,
           
          })} />
        </form>
      </div>
    )
  }
}

export default TeamForm
