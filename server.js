'use strict'
const express = require('express');
const api = require('./backend/routes/api')

const app = express();


app.use('/', express.static('frontend/build'));

app.use('/api', api);





// app.get('/', (require, response) =>{
// 	response.render('login');
// })
app.listen(8080)
