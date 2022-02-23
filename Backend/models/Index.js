const { Sequelize } = require('sequelize');
const schemaSQL = `CREATE DATABASE IF NOT EXISTS \`${process.env.SQL_DB}\`;`;
const mysql = require('mysql2/promise');


const sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USER, process.env.SQL_PASS, {
  host: process.env.SQL_HOST,
  dialect: 'mysql',
});


async function DBinitialize() {

  const host = sequelize.host;
  const user = process.env.SQL_USER;
  const password = process.env.SQL_PASS;

  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(schemaSQL);
}


async function DBconnection() {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    //if the connection failed try to create a database if it doesn't exist.
    DBinitialize();
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
  foreignKey: 'userId', as: 'user', allowNull: false }, 
  { onDelete:'CASCADE'});
db.likes.belongsTo(db.posts, {
  foreignKey: 'postId', as: 'post', }, 
  { onDelete:'CASCADE'});

db.users.hasMany(db.posts, {as: 'post'});
db.users.hasMany(db.comments, {as: 'comment'});
db.posts.hasMany(db.comments, {as: 'com'});
db.users.hasMany(db.likes, {as: 'likeUser' });
db.posts.hasMany(db.likes, {as: 'like' });

sequelize.sync();

module.exports = db;