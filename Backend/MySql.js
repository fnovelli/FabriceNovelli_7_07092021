
var mysql = require('mysql');
const schema = `CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DB}`;


const con = mysql.createConnection({

  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
});


con.connect(function(err) {
  
   if (err) {
     throw err; 
    }

    console.log("SQL User connected");

    con.query(schema, function (err, result) {

      if (err) {
        throw err; 
      }

        console.log("Connected to database");

    });

 });

