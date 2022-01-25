const { Sequelize } = require('sequelize');
const schemaSQL = `CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DB}`;

const sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USER, process.env.SQL_PASS, {
  host: process.env.SQL_HOST,
  dialect: 'mysql',
});


async function DBconnection() {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

DBconnection();


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../Models/User')(sequelize, Sequelize);
db.posts = require('../Models/Posts')(sequelize, Sequelize);
db.comments = require('../Models/Comments')(sequelize, Sequelize);
db.likes = require('../Models/Likes')(sequelize, Sequelize);

db.posts.belongsTo(db.users, {
  foreignKey: 'userId', as: 'user', allowNull: false }, 
  { onDelete:'CASCADE'});

db.comments.belongsTo(db.users, {
  foreignKey: 'userId', as: 'user', allowNull: false }, 
  { onDelete:'CASCADE'});
db.comments.belongsTo(db.posts, {
  foreignKey: 'postId', as: 'post', }, 
  { onDelete:'CASCADE'});


db.likes.belongsTo(db.users, {
  foreignKey: 'userId', as: 'user', }, 
  { onDelete:'CASCADE'});
db.likes.belongsTo(db.posts, {
  foreignKey: 'postId', as: 'post', }, 
  { onDelete:'CASCADE'});

db.users.hasMany(db.posts, {as: 'post'});
db.users.hasMany(db.comments, {as: 'comment'});
db.users.hasMany(db.likes, {as: 'like' });
db.posts.hasMany(db.likes, {as: 'like' });
db.posts.hasMany(db.comments, {as: 'com'});



const Users = db.users;


/*async function createJaneUser() {
   const jane = Users.build({ 
      name: 'Jane',
      nickname: 'Jaja',
      email: 'jane@gmail.com',
      password: 'passw0rd',
      admin: false
   })

   console.log(jane.name);
   console.log(jane.nickname);
   try { 
   await jane.save();
   console.log("user " + jane.name + " has been added in the database.");
   }
   catch (error) {
      console.error('Unable to save user in DBB.', error);
   }


  await sequelize.sync({force:true});
}


createJaneUser();*/


module.exports = db;