// we have also seen 
// import express from 'express'
// the require function is for the common JS module system,
// and the import keyword is for the ES2015 module system.
// these two systems are different and Node only supports 
// common JS module system.

// express is the utility for Node to handle HTTP request 
// easier. 
const express = require('express');

// the app object set up configuration to route request from
// the node side to the express side, and to different route
// handlers
// All route handlers are registered with the app object
const app = express();


// dynamically look at the environment and see if there is a
// environment variable that defines the port; if not, use
// default value
const PORT = process.env.PORT || 5000;
// it is actually not express but Node listens the port 5000,
// and express takes the request and redirect it to different 
// route handlers.
app.listen(PORT);