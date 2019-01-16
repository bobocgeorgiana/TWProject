import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'https://proiect-georgianaboboc.c9users.io/'

class TeamStore{
    constructor(){
        this.content = []
        this.emitter = new EventEmitter()
    }
    async getAll(){
        try {
            let response = await axios(`${SERVER}/teams`)
            this.content = response.data
            this.emitter.emit('GET_ALL_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async addOne(team){
        try {
            await axios.post(`${SERVER}/teams`, team)
            this.emitter.emit('ADD_SUCCESS')
            this.getAll()
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ADD_ERROR')
        }
    }
    async deleteOne(id){
        try {
            await axios.delete(`${SERVER}/teams/${id}`)
            this.emitter.emit('DELETE_SUCCESS')
            this.getAll()
        } catch (e) {
            console.warn(e)
            this.emitter.emit('DELETE_ERROR')
        }
    }
    async saveOne(id, team){
        try {
            await axios.put(`${SERVER}/teams/${id}`, team)
            this.emitter.emit('SAVE_SUCCESS')
            this.getAll()
        } catch (e) {
            console.warn(e)
            this.emitter.emit('SAVE_ERROR')
        }
    }
}

export default TeamStore