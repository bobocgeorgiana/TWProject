import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'https://proiect-georgianaboboc.c9users.io/'

class PlayerStore{
    constructor(){
        this.content = []
        this.emitter = new EventEmitter()
    }
    async getAll(teamId){
        try {
            let response = await axios(`${SERVER}/teams/${teamId}/players`)
            this.content = response.data
            this.emitter.emit('GET_ALL_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async addOne(teamId, player){
        try {
            await axios.post(`${SERVER}/teams/${teamId}/players`, player)
            this.emitter.emit('ADD_SUCCESS')
            this.getAll(teamId)
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ADD_ERROR')
        }
    }
    async deleteOne(teamId, playerId){
        try {
            await axios.delete(`${SERVER}/teams/${teamId}/players/${playerId}`)
            this.emitter.emit('DELETE_SUCCESS')
            this.getAll(teamId)
        } catch (e) {
            console.warn(e)
            this.emitter.emit('DELETE_ERROR')
        }
    }
    async saveOne(teamId, playerId, player){
        try {
            await axios.put(`${SERVER}/teams/${teamId}/grades/${playerId}`, player)
            this.emitter.emit('SAVE_SUCCESS')
            this.getAll(teamId)
        } catch (e) {
            console.warn(e)
            this.emitter.emit('SAVE_ERROR')
        }
    }
}

export default PlayerStore