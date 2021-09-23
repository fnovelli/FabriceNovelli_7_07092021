
var mysql = require('mysql');
const app = require('./app');
const schema = `CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DB}`;
const useDB = `USE ${process.env.SQL_DB}`;
const userTable = `CREATE TABLE IF NOT EXISTS User (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(100),
  password VARCHAR(200),
  PRIMARY KEY (id)
  )`;


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

    });

    db.query(useDB, function (err, result) {
      if (err) {
        throw err; 
       }

      console.log("Connected to " + process.env.SQL_DB);

    })

    db.query(userTable, function (err, result) {

      if (err) {
        throw err; 
       }

      console.log("Table created!");
    })

 });

