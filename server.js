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
			len : [3, 50]
		}
	},
	password : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 50]
		}
	}
	
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
		isDate: true,
		isAfter: Sequelize.NOW
		
	},
	score : {
		type : Sequelize.INTEGER,
		validate : {
			isNumeric : true,
			min : 1,
			max: 5
		}
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


//testarea conexiunii cu baza de date
sequelize.authenticate()
.then(()=>{
    console.log('Realizarea conexiunii cu baza de date s-a realizat cu succes!')
    })
    .catch(()=>{
        console.log('A fost o eroare la realizarea conexiunii cu baza de date!')
    })


//metodă pentru recrearea tabelelor din baza de date
app.get('/createdb',(request,response)=>{
    sequelize.sync({force:true})
    .then(()=>{
        response.status(201).send('Tabelele au fost recreate!')
        
    })
        .catch(()=>{
        response.status(500).send('Eroare server')})
        
})


// metode HTTP pentru tabela users

//metodă de preluare a tuturor utilizatorilor
app.get('/users', (request,response) => {
    User.findAll()
    .then((results) => {
        response.status(200).json(results)
    })
    .catch(()=>{
        response.status(500).send("Eroare server")
        
    })
})


//metodă de creare a utilizatorilor;  
//dacă parametrul bulk are valoarea "ok" vom adauga mai multi utilizatori, daca nu, unul singur
app.post('/users', (request, response) => {
		if (request.query.bulk && request.query.bulk == 'ok'){
			 User.bulkCreate(request.body)
			 .then(()=>{
			response.status(201).send('Utilizatorii au fost creati!')
		   })
	.catch(()=>
			response.status(500).send('Eroare server')
			)}
	else{
	User.create(request.body)
	.then(()=>{
	    response.status(201).send('Utilizatorul a fost creat!')
	})
      .catch(()=>
			response.status(500).send('Eroare server'))
	}
})

//metodă de preluare a unui utilizator in functie de id
app.get('/users/:id', (request,response)=>
{
    User.findById(request.params.id)
    .then((result)=>{
        if(result){
        response.status(200).json(result)
        }
    else{
    response.status(404).send("Utilizatorul nu a fost gasit!")
    }
    
    })
    .catch(()=>{
        response.status(500).send("Eroare server")
    })
    
})

//metodă de modificare a unui utilizator in functie de id
// app.put('/users/:id', (request,response)=>{
//     User.findById(request.params.id)
//     .then((result)=>{
//         if(result){
//       return result.update(request.body)
//         }
//     else{
//     response.status(404).send("Utilizatorul nu a fost gasit!")
//     }
    
//     })
//     .then(()=>{
//         response.status(201).send("Utilizatorul a fost modificat!")
//     })
//   .catch(()=>{
//         response.status(500).send("Eroare server")
//     })
    
// })
    

app.use('/', express.static('static'))

app.listen(8080)