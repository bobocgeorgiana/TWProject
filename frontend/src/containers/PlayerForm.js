import React, { Component } from 'react';

class PlayerForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      age : -1
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
          <label for="firstName">Nume</label>
          <input type="text" id="firstName" name="firstName" onChange={this.handleChange} />
          <label for="lastName">Prenume</label>
          <input type="text" id="lastName" name="lastName" onChange={this.handleChange} />
          
          <label for="age">Varsta</label>
          <input type="text" id="age" name="age" onChange={this.handleChange} />
          
          <input type="button" value="add" onClick={() => this.props.onAdd({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            age : this.state.age
          })} />
        </form>
      </div>
    )
  }
}

export default PlayerForm
