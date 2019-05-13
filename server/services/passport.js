const passport = require('passport');
const keys = require('../config/keys'); 
// we actually just care about the strategy part
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    // after user logs into the account and authenticate, the Node server
    // would send request to google with the code included, when google sees
    // the code, it replies with the user profile and the access token
  }, (accessToken, refreshToken, profile, done) => {
    // the access token is the proof that the user has authenticated 
    // the server to request user data from google.
    console.log('access token: ', accessToken);
    console.log('refresh token: ', refreshToken);
    console.log('profile:', profile);
  }
));