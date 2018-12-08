const express = require('express');
const router = express.Router();
const passport = require('passport');


//auth login
router.get('/login', (require, response) =>{
    response.send('logging in');
})

//auth logout
router.get('/logout', (require, response) =>{
    response.send('logging out')
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (require, response) =>{
    response.send('you reached the callbeck URI');
})

module.exports = router;