import React, { Component } from 'react'
import PlayerStore from '../stores/PlayerStore'
import Player from './Player'
import PlayerForm from './PlayerForm'

class TeamDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      grades : []
    }
    this.store = new PlayerStore()
    this.add = (player) => {
      this.store.addOne(this.props.item.id, player)
    }
    this.delete = (playerId) => {
      this.store.deleteOne(this.props.item.id, playerId)
    }
    this.save = (playerId, player) => {
      this.store.saveOne(this.props.item.id, playerId, player)
    }
  }
  componentDidMount(){
    this.store.getAll(this.props.item.id)
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        players : this.store.content
      })
    })
  }
  render() {
    return (
      <div>
        <div>
          Membrii echipei {this.props.item.name}
        </div>
        <div>
          {this.state.players.map((e, i) => <Player item={e} key={i} onDelete={this.delete} onSave={this.save} />)}
        </div>
        <div>
          <PlayerForm onAdd={this.add} />
        </div>
        <div>
          <input type="button" value="back" onClick={() => this.props.onExit()}/>
        </div>
      </div>
    )
  }
}

export default TeamDetails
