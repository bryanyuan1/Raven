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

// this route handler looks similar to the above one. Notice that now google sents back the code behind the callback url to notify the passport that the user has already been authenticated. The passport would then take the code and do followup requests to google
app.get(
  '/auth/google/callback',
  passport.authenticate('google')
)