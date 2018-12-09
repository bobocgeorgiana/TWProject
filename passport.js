const passport = require("passport");
const GooglePlusTokenStrategy = require('passport-google-plus-token');

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '97010449707-4d2up6i3jo70ommph6nuhsu6tj102hac.apps.googleusercontent.com',
    clientSecret: 'uPJSt7uUWBb_j2caa4fV1sTt'
}, async (accessToken, refreshToken, profile, done) =>{
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
}));