'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const cookieSession = require('cookie-session');

const Op = Sequelize.Op;

const sequelize = new Sequelize('calendar', 'root', '', {
	dialect: 'mysql',
	define: {
		timestamps: false
	}
})

const User = sequelize.define('user', {
	gmail: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}

})

let Event = sequelize.define('event', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 30]
		}
	},

	date: {
		type: Sequelize.DATE,
		allowNull: false,
		isDate: true,
		isAfter: Sequelize.NOW

	},
	score: {
		type: Sequelize.INTEGER,
		validate: {
			isNumeric: true,
			min: 1,
			max: 5
		}
	},
	description: {
		type: Sequelize.STRING,
		validate: {
			len: [5, 100]
		}
	},

	startTime: {
		type: Sequelize.TIME,
		allowNull: false,
	},

	endTime: {
		type: Sequelize.TIME,
		allowNull: false,
	},


})

let Reminder = sequelize.define('reminder', {
	daysbefore: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isNumeric: true,
			min: 0
		}
	},
	weeksbefore: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isNumeric: true,
			min: 0
		}
	},
	hoursbefore: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isNumeric: true,
			min: 0
		}
	},
	minutesbefore: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isNumeric: true,
			min: 0
		}
	},

})


let Location = sequelize.define('location', {
	country: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 40]
		}
	},
	city: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 40]
		}
	},
	street: {
		type: Sequelize.STRING,
		validate: {
			len: [3, 40]
		}
	},

	number: {
		type: Sequelize.INTEGER,
		validate: {
			isNumeric: true,
			min: 0
		}
	},

})

//Intre tabela users si events exista o realtie de 1-n, un utilizator putand avea unul sau mai multe evenimente.
//De asemenea, proprietatea onDelete a fost setata pe 'cascade' deoarece in momentul in care se sterge un utilizator, dorim sa se stearga si toate event-urile acestuia
User.hasMany(Event, { onDelete: 'cascade', hooks: true })

//Intre tabela evnts si locations exista o realtie de 1-1, deoarece un event se poate desfasura intr-o sigura locatie.
Event.hasOne(Location, { foreignKey: { unique: 'eventId' } })

//Intre tabela events si reminders exista o realtie de 1-n, un event putand avea unul sau mai multe remindere.
//De asemenea, proprietatea onDelete a fost setata pe 'cascade' deoarece in momentul in care se sterge un event, dorim sa se stearga si toate remider-urile acestuia.
Event.hasMany(Reminder, { onDelete: 'cascade', hooks: true })


const app = express()
app.use(bodyParser.json())



//testarea conexiunii cu baza de date
sequelize.authenticate()
	.then(() => {
		console.log('Conexiunea cu baza de date s-a realizat cu succes!')
	})
	.catch(() => {
		console.log('A fost o eroare la realizarea conexiunii cu baza de date!')
	})


//metodă pentru recrearea tabelelor din baza de date
app.get('/createdb', (request, response) => {
	sequelize.sync({ force: true })
		.then(() => {
			response.status(201).send('Tabelele au fost recreate!')

		})
		.catch(() => {
			response.status(500).send('Eroare server')
		})

})


// metode HTTP pentru tabela users



//metodă de preluare a tuturor utilizatorilor in ordine descrescatore a gmail-ului
//metodă de cautare a unor urilizatori in functie de gmailul acestora daca avem si parametrul gmail
app.get('/users', (req, res) => {
		let params = {
			where : {},
			order : [['gmail', 'DESC']]
		}
	    if (req.query.gmail){
	    	
				params.where.gmail = {
	        		[Op.like] : `%${req.query.gmail}%`
	        	
	    	}
	    }
	User.findAll(params)
		.then((results) => {
			res.status(200).json(results)
		})
		.catch(() => {
			res.status(500).send("Eroare server")

		})
})

//metodă de preluare a unui utilizator in functie de id
app.get('/users/:id', (request, response) => {
	User.findById(request.params.id)
		.then((result) => {
			if (result) {
				response.status(200).json(result)
			}
			else {
				response.status(404).send("Utilizatorul nu a fost gasit!")
			}

		})
		.catch(() => {
			response.status(500).send("Eroare server")
		})

})

//metodă de modificare a unui utilizator in functie de id
app.put('/users/:id', (request, response) => {
	User.findById(request.params.id)
		.then((user) => {
			if (user) {
				user.update(request.body).then((result) => {
					response.status(201).json(result)
				}).catch((err) => {
					console.log(err)
					response.status(500).send('Eroare server')
				})
			}
			else {
				response.status(404).send('Utilizatorul nu a fost gasit!')
			}
		}).catch((err) => {
			console.log(err)
			response.status(500).send('Eroare server')
		})
})

//metodă de stergere a unui utilizator in functie de id  
app.delete('/users/:id', (request, response) => {
	User.findById(request.params.id).then((user) => {
		if (user) {
			user.destroy().then((result) => {
				response.status(201).send('Utilizatorul a fost sters cu succes!')
			}).catch((err) => {
				console.log(err)
				response.status(500).send('Eroare server')
			})
		}
		else {
			response.status(404).send('Utilizatorul nu a fost gasit!')
		}
	}).catch((err) => {
		console.log(err)
		response.status(500).send('Eroare server')
	})
})



// metode HTTP pentru tabela events

//metodă de creare a unui event al unui anumit utilizator;  
app.post('/users/:uid/events', (req, res) => {
	User.findById(req.params.uid)
		.then((result) => {
			if (result) {
				let event = req.body
				event.userId = result.id
				return Event.create(event)
			}
			else {
				res.status(404).json({ message: 'Utilizatorul nu a fost gasit!' })
			}
		})
		.then(() => {

			res.status(201).json('Evenimentul a fost creat cu succes!')
		})
		.catch(() => res.status(500).send('Eroare server'))
})


//metodă de preluare a tuturor eventurilor in ordine descrescatore a datei
//metodă de cautare a unor eventuri in functie de numele acestora
//metodă de preluare a tuturor eventurilor dintr-o anumita zi
app.get('/users/:uid/events', (req, res) => {
	let params = {
			where : {},
			order : [['date', 'DESC']]
		}
	User.findById(req.params.uid)
		.then((result) => {
			if (result) {
				if(req.query)
				{
				if (req.query.date){
	    	
				params.where.date = {
	        		[Op.like] : `%${req.query.date}%`
	        	
	    	}
	    }
	    if (req.query.name){
	    	
				params.where.name = {
	        		[Op.like] : `%${req.query.name}%`
	        	
	    	}
	    }
				}
				return result.getEvents(params)
			}
			else {
				res.status(404).json({ message: 'Utilizatorul nu a fost gasit!' })
			}
		})
		.then((results) => {

			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('Eroare server'))
})



//metodă de preluare a unui anumit event al unui utilizator in functie de id
app.get('/users/:uid/events/:eid', (req, res) => {
	User.findById(req.params.uid)
		.then((result) => {
			if (result) {
				return result.getEvents({where:{id : req.params.eid}})
			}
			else {
				res.status(404).json({ message: 'Utilizatorul nu a fost gasit!' })
			}
		})
		.then((results) => {

			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('Eroare server'))
})

//metodă de modificare a unui anumit event al unui utilizator
app.put('/users/:uid/events/:eid', (req, res) => {
	Event.findById(req.params.eid)
		.then((result) => {
			if (result) {
				return result.update(req.body)
			}
			else {
				res.status(404).json({ message: 'Evenimentul nu a fost gasit!' })
			}
		})
		.then(() => {

			res.status(201).json({ message: 'Evenimentul a fost modificat!' })
		})
		.catch(() => res.status(500).send('Eroare server'))
})

//metodă de stergere a unui anumit event al unui utilizator
app.delete('/users/:uid/events/:eid', (req, res) => {
	Event.findById(req.params.eid)
		.then((result) => {
			if (result) {
				return result.destroy()
			}
			else {
				res.status(404).json({ message: 'Evenimentul nu a fost gasit!' })
			}
		})
		.then(() => {

			res.status(201).json({ message: 'Evenimentul a fost sters!' })
		})
		.catch(() => res.status(500).send('Eroare server'))
})



// metode HTTP pentru tabela location

//metodă de creare a locatiei unui anumit event
app.post('/users/:uid/events/:eid/locations', (req, res) => {
	Event.findById(req.params.eid)
		.then((result) => {
			if (result) {

				let location = req.body
				location.eventId = result.id
				return Location.create(location)

			}
			else {
				res.status(404).json({ message: 'Eventul nu a fost gasit!' })
			}
		})
		.then(() => {

			res.status(201).json('Locatia a fost adaugata cu succes!')
		})
		.catch(() => res.status(500).send('Eroare server'))
})

//metodă de preluare a locatiei unui anumit event
app.get('/users/:uid/events/:eid/locations', (req, res) => {
	Event.findById(req.params.eid)
		.then((result) => {
			if (result) {
				return result.getLocation()
			}
			else {
				res.status(404).json({ message: 'Evenimentul nu a fost gasit!' })
			}
		})
		.then((result) => {

			res.status(200).json(result)
		})
		.catch(() => res.status(500).send('Eroare server'))
})


//metodă de modificare a locatiei unui anumit event
app.put('/users/:uid/events/:eid/locations/:lid', (req, res) => {
	Location.findById(req.params.lid)
		.then((result) => {
			if (result) {
				return result.update(req.body)
			}
			else {
				res.status(404).json({ message: 'Locatia nu a fost gasita!' })
			}
		})
		.then(() => {

			res.status(201).json({ message: 'Locatia a fost modificata!' })
		})
		.catch(() => res.status(500).send('Eroare server'))
})


//metodă de stergere a locatiei unui anumit event
app.delete('/users/:uid/events/:eid/locations/:lid', (req, res) => {
	Location.findById(req.params.lid)
		.then((result) => {
			if (result) {
				return result.destroy()
			}
			else {
				res.status(404).json({ message: 'Locatia nu a fost gasita!' })
			}
		})
		.then(() => {

			res.status(201).json({ message: 'Locatia a fost stersa!' })
		})
		.catch(() => res.status(500).send('Eroare server'))
})


// metode HTTP pentru tabela remidere


//metodă de creare a unui reminder pentru un event 
app.post('/users/:uid/events/:eid/reminders', (req, res) => {
	Event.findById(req.params.eid)
		.then((result) => {
			if (result) {

				let reminder = req.body
				reminder.eventId = result.id
				return Reminder.create(reminder)

			}
			else {
				res.status(404).json({ message: 'Eventul nu a fost gasit!' })
			}
		})
		.then(() => {

			res.status(201).json('Reminder-ul a fost adaugat cu succes!')
		})
		.catch(() => res.status(500).send('Eroare server'))
})

//metodă de preluare a reminder-elor unui anumit event
app.get('/users/:uid/events/:eid/reminders', (req, res) => {
	Event.findById(req.params.eid)
		.then((result) => {
			if (result) {
				return result.getReminders()
			}
			else {
				res.status(404).json({ message: 'Evenimentul nu a fost gasit!' })
			}
		})
		.then((results) => {

			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('Eroare server'))
})

//metodă de preluare a unui anumit reminder al unui event in functie de id
app.get('/users/:uid/events/:eid/reminders/:rid', (req, res) => {
	Event.findById(req.params.eid)
		.then((result) => {
			if (result) {
				return result.getReminders({where:{id : req.params.rid}})
			}
			else {
				res.status(404).json({ message: 'Evenimentul nu a fost gasit!' })
			}
		})
		.then((results) => {

			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('Eroare server'))
})

//metodă de modificare a unui anumit reminder al unui event
app.put('/users/:uid/events/:eid/reminders/:rid', (req, res) => {
	Reminder.findById(req.params.rid)
		.then((result) => {
			if (result) {
				return result.update(req.body)
			}
			else {
				res.status(404).json({ message: 'Reminder-ul nu a fost gasit!' })
			}
		})
		.then(() => {

			res.status(201).json({ message: 'Reminder-ul a fost modificat!' })
		})
		.catch(() => res.status(500).send('Eroare server'))
})


//metodă de stergere a unui reminder unui anumit anumit event
app.delete('/users/:uid/events/:eid/reminders/:rid', (req, res) => {
	Reminder.findById(req.params.rid)
		.then((result) => {
			if (result) {
				return result.destroy()
			}
			else {
				res.status(404).json({ message: 'Reminder-ul nu a fost gasit!' })
			}
		})
		.then(() => {

			res.status(201).json({ message: 'Reminder-ul a fost sters!' })
		})
		.catch(() => res.status(500).send('Eroare server'))
})

app.use(express.static('static', {index: 'login.html'}))

// cookieSession config
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['randwgqkpkqwastsromkk21@%@wto12@$$wlafp;$kawml2p0kasfmaw']
}));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(new GoogleStrategy({
        clientID: '97010449707-4d2up6i3jo70ommph6nuhsu6tj102hac.apps.googleusercontent.com',
        clientSecret: 'uPJSt7uUWBb_j2caa4fV1sTt',
        callbackURL: 'https://protiect-tw-adicarry.c9users.io/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
        done(null, profile); // passes the profile data to serializeUser
    }
));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
    console.log(user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('You must login!');
    }
}

// passport.authenticate middleware is used here to authenticate the request
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] // Used to specify the required data
}));
// The middleware receives the data from Google and runs the function on Strategy config
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/secret');
});

var fs = require('fs');

// Secret route
app.get('/secret', isUserAuthenticated, (req, response) => {
    fs.readFile('./static/index.html', null, function(error, data){
    	if(error){
    		response.writeHead(404);
    		response.write('File not found!');
    	} else {
    		response.write(data);
    	}
    	response.end();
    })
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(); 
    res.redirect('/');
});




// app.get('/', (require, response) =>{
// 	response.render('login');
// })
app.listen(8080)
