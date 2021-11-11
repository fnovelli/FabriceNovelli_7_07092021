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

//const Comments = require('../Models/Comments')
//const Users = require('../Models/User')

//Users.hasMany(Posts, {as: 'posts'})
//Users.hasMany(Comments, {as: 'comments', foreignKey: 'userId'})

//Posts.belongsTo(Users, {foreignKey: 'userId', as: 'user', });
//Comments.belongsTo(Users, {foreignKey: 'userId', as: 'user', });
//Comments.belongsTo(Posts, {foreignKey: 'msgId', as: 'post', });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../Models/User')(sequelize, Sequelize);
db.posts = require('../Models/Posts')(sequelize, Sequelize);

db.users.hasMany(db.posts, {as: 'posts'})

//Users.hasMany(Comments, {as: 'comments', foreignKey: 'userId'})
//Comments.belongsTo(Users, {foreignKey: 'userId', as: 'user', });
//Comments.belongsTo(Posts, {foreignKey: 'msgId', as: 'post', });

db.posts.belongsTo(db.users, {foreignKey: 'userId', as: 'user', });


module.exports = db;