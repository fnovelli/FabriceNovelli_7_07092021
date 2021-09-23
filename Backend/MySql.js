
var mysql = require('mysql');
const app = require('./app');
const schema = `CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DB}`;


const db = mysql.createConnection({

  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
});

// we try to connect the user, then we create the database.
db.connect(function(err) {

   if (err) {
     throw err; 
    }

    console.log("SQL User connected");

    db.query(schema, function (err, result) {

      if (err) {
        throw err; 
      }

        console.log("Connected to database");

    });

 });

