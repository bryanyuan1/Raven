// we have also seen 
// import express from 'express'
// the require function is for the common JS module system,
// and the import keyword is for the ES2015 module system.
// these two systems are different and Node only supports 
// common JS module system.

// express is the utility for Node to handle HTTP request 
// easier. 
const express = require('express');
const passport = require('passport');
const keys = require('./config/keys'); 
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
    console.log('profile: ', profile);
  }
));

// the app object set up configuration to route request from
// the node side to the express side, and to different route
// handlers
// All route handlers are registered with the app object
const app = express();

// when the user try to get the url, we try to let the passport authenticate
// the google.
app.get(
  '/auth/google', 
  // the googleStrategy has internally relate itself to the string 'google'.
  // so when we call 'google' in the authenticate function, the passport would
  // know that it is calling the google strategy.
  passport.authenticate('google', {
    // the kind of data we want from the users
    scope: ['profile', 'email'],
  }
))

// this route handler looks similar to the above one. Notice that now google sents back the code to notify the passport that it is not the first time to authenticate. So instead of kicking to the google auth page again, it would take the code and do the followup request to google. 
app.get(
  '/auth/google/callback',
  passport.authenticate('google')
)

// dynamically look at the environment and see if there is a
// environment variable that defines the port; if not, use
// default value
const PORT = process.env.PORT || 5000;
// it is actually not express but Node listens the port 5000,
// and express takes the request and redirect it to different 
// route handlers.
app.listen(PORT);