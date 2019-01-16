import React, { Component } from 'react';
import TeamStore from '../stores/TeamStore'
import Team from './Team'
import TeamForm from './TeamForm'
import TeamDetails from './TeamDetails'

class TeamList extends Component {
  constructor(){
    super()
    this.state = {
      teams : [],
      detailsFor : -1,
      selectedTeam : null
    }
    this.store = new TeamStore()
    this.add = (team) => {
      this.store.addOne(team)
    }
    this.delete = (id) => {
      this.store.deleteOne(id)
    }
    this.save = (id, team) => {
      this.store.saveOne(id, team)
    }
    this.select = (id) => {
      let selected = this.state.teams.find((e) => e.id === id)
      this.setState({
        detailsFor : id,
        selectedTeam : selected
      })
    }
    this.reset = () => {
      this.setState({
        detailsFor : -1,
        selectedTeam : null
      })
    }
  }
  componentDidMount(){
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        teams : this.store.content
      })
    })
  }
  render() {
    if (this.state.detailsFor === -1){
      return (
        <div>
          {this.state.teams.map((e, i) => <Team item={e} key={i} onDelete={this.delete} onSave={this.save} onSelect={this.select} />)}  
          <TeamForm onAdd={this.add} />
        </div>
      )
    }
    else{
      return (
        <TeamDetails item={this.state.selectedTeam} onExit={this.reset} />
      )
    }
  }
}

export default TeamList
