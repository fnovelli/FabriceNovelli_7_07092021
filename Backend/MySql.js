
var mysql = require('mysql');


const con = mysql.createConnection({

  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
});


const schema = `CREATE DATABASE ${process.env.SQL_DB}`;

con.connect(function(err) {
   if (err) {
     throw err; 
    }

   console.log("SQL User connected");

 });

