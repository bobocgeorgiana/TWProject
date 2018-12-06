'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('calendar','root','',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

const User = sequelize.define('user', {
	username : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 20]
		}
	},
	password : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 20]
		}
	},
	
})

let Event = sequelize.define('event',{
	name : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 30]
		}
	},
	
    date : {
        type : Sequelize.DATE,
		allowNull: false,
		defaultValue : Sequelize.NOW
		
	},
		description : {
		type : Sequelize.STRING,
		validate : {
			len : [5, 100]
		}
	},
	duration : {
		type : Sequelize.FLOAT,
		validate : {
			isNumeric : true,
			min : 0
		}
	},
	
})

let Reminder = sequelize.define('reminder',{
		daysbefore : {
		type : Sequelize.INTEGER,
		allowNull : false,
		validate : {
			isNumeric : true,
			min : 0
		}
	},
	weeksbefore : {
		type : Sequelize.INTEGER,
		allowNull : false,
		validate : {
			isNumeric : true,
			min : 0
		}
	},
		hoursbefore : {
		type : Sequelize.INTEGER,
		allowNull : false,
		validate : {
			isNumeric : true,
			min : 0
		}
	},
	minutesbefore : {
		type : Sequelize.INTEGER,
		allowNull : false,
		validate : {
			isNumeric : true,
			min : 0
		}
	},
	
})	


let Location = sequelize.define('location',{
    	country : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 40]
		}
	},
	city : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 40]
		}
	},
	street : {
		type : Sequelize.STRING,
		validate : {
			len : [3, 40]
		}
	},
	
	number : {
		type : Sequelize.INTEGER,
		validate : {
			isNumeric : true,
			min : 0
		}
	},
	
})	

User.hasMany(Event)
Location.belongsTo(Event)
Event.hasMany(Reminder)

const app = express()
app.use(bodyParser.json())

sequelize.authenticate().then(function(){
    console.log('succes')
}).catch(function(){
    console.log('there was an error connecting to db')
})


app.get('/createdb', function(request,response){
    sequelize.sync({force:true}).then(function(){
        response.status(200).send('tables created')
    }).catch(function(){
        response.status(200).send('could not create tables')
    })
})

app.use('/', express.static('static'))

app.listen(8080)