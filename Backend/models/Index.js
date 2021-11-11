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


db.posts.belongsTo(db.users, {foreignKey: 'userId', as: 'user', });

db.comments.belongsTo(db.users, {foreignKey: 'userId', as: 'user', });
db.comments.belongsTo(db.posts, {foreignKey: 'msgId', as: 'post', });

db.users.hasMany(db.posts, {as: 'post'});
db.users.hasMany(db.comments, {as: 'comment'});



module.exports = db;