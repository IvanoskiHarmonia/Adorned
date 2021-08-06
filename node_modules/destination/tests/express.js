// Application
var express = require('express');
var app = express();
var Destination = require('../index');

// Logging
Destination.level('debug');

// Body Parser
app.use(express.bodyParser());

// Initialize Destination
var destination = Destination.start(app, {
  name: 'mongodb',
  host: '127.0.0.1'
});

// Another Way
var User = destination.define('User', {
  collection: true,

  routing: {
    fetch: { by: 'name', projection: { name: 1 } },
    create: true
  },

  name: {
    type: String,
    length: {
      min: 3,
      max: 24
    }
  },

  password: {
    type: String,
    length: {
      min: 3,
      max: 36
    }
  }
});

// Optional, you can use app.listen
destination.listen(1337);