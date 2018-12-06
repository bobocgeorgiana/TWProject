const express = require('express')
const Sequelize = require('sequelize')


const sequelize = new Sequelize('calendar', 'root', '', {
    dialect: "mysql",
    host: "localhost"
})

sequelize.authenticate().then(function(){
    console.log('succes')
}).catch(function(){
    console.log('there was an error connecting to db')
})

const Users=sequelize.define('users', {
 id_user:Sequelize.INTEGER,
username:Sequelize.STRING,
password:Sequelize.STRING

 })

const app = express()

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})



app.use('/', express.static('static'))
app.listen(8080)
