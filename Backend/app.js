const express = require('express');

var fs = require('fs')
require('dotenv').config()

const path = require('path');
var sql = import('./my-sql.js');


//init security
var cors = require('cors');
const rateLimit = require("express-rate-limit");
var morgan = require('morgan')
  
const { Sequelize } = require('sequelize');
const app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))



app.get('/', function (req, res) {
  res.send('hello, world!')
})

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 1000 requests per windowMs
  });

  //body-parser is outdated, we use this syntax instead, the idea is still the same, analyse and treat body request.
  app.use(express.urlencoded({extended: true})); 
  app.use(express.json());

  //fix security when doing http request
  app.use(cors())
  app.use(limiter);
  app.use(morgan('combined'))


  module.exports = app;