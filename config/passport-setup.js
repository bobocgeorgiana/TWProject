const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use (
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID: '97010449707-4d2up6i3jo70ommph6nuhsu6tj102hac.apps.googleusercontent.com',
        clientSecret: 'uPJSt7uUWBb_j2caa4fV1sTt'
    }, (accesToken, refreshToken, profile, done)=> {
        console.log('passport callback function fired');
    })
);
    