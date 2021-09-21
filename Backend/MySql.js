var mysql = require('mysql');


exports.db = mysql.createConnection({

  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,

});

exports.db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});



