
var mysql = require('mysql');
const app = require('./app');
const schemaSQL = `CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DB}`;
const useDBSQL = `USE ${process.env.SQL_DB}`;
const userTableSQL = `CREATE TABLE IF NOT EXISTS User (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(100),
  password VARCHAR(200),
  PRIMARY KEY (id)
  )`;

  const insertUser = `INSERT INTO User VALUES (NULL, 'User1', 'password')`;
  const selectUser = `SELECT * FROM User`;
  const updateUser = `UPDATE User SET nickname='USER2' WHERE id=1`;
  const deleteUser = `DELETE FROM User WHERE id=1`;


const db = mysql.createConnection({

  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
});

function CheckAndCreateDatabase() {
  db.query(schemaSQL, function (err, result) {

    if (err) {
      throw err; 
    }

  });
}

function ConnectToDB() {

  db.query(useDBSQL, function (err, result) {
    if (err) {
      throw err; 
     }

    console.log("Connected to " + process.env.SQL_DB);

  })
}

function CreateUserTable() {
  db.query(userTableSQL, function (err, result) {

    if (err) {
      throw err; 
     }

    console.log("Table created!");
  })
}

function AddUserToTable() {
      db.query(insertUser, function (err, result) {

      if (err) {
        throw err; 
       }

      console.log("User1 added to the table User");
    })
}

function SelectUser() {
    
  db.query(selectUser, function (err, result) {

    if (err) {
      throw err; 
     }

    console.log(result);
  })
}

function RenameUser() {
  db.query(updateUser, function (err, result) {

    if (err) {
      throw err; 
     }

    console.log("First user was renamed to User2");
  })
}

function DeleteUser() {
  
  db.query(deleteUser, function (err, result) {

    if (err) {
      throw err; 
     }

    console.log("User2 has been deleted from the DBB");
  })


}

// we try to connect the user, then we create the database.
db.connect(function(err) {

   if (err) {
     throw err; 
    }

    console.log("SQL User connected");

    CheckAndCreateDatabase();
    ConnectToDB();
    CreateUserTable();
    AddUserToTable();
    SelectUser();
    RenameUser();
    DeleteUser();
 });

