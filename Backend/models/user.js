const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')
const Posts = require('../Models/Posts')
const Comments = require('../Models/Comments')

const Users = sequelize.define('user', {

   userId:{
      // Integer Datatype
      type:Sequelize.INTEGER,

      // Increment the value automatically
      autoIncrement:true,

      // user_id can not be null.
      allowNull:false,

      // To uniquely identify user
      primaryKey:true
   },

   name: { type: Sequelize.STRING, allowNull:false },

   nickname: { type: Sequelize.STRING, allowNull:false },

   email: { type: Sequelize.STRING, allowNull:false, unique: true },
   
   password: { type: Sequelize.STRING, allowNull:false },
 
   admin: { type: Sequelize.BOOLEAN, allowNull:false, defaultValue: false },
})

Users.hasMany(Posts, { as: "posts"});

Users.hasMany(Comments, { as: "comments"});

module.exports = Users