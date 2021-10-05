const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')

const User = sequelize.define('user', {
   // Name of Column #1 and its properties defined: id
   user_id:{

      // Integer Datatype
      type:Sequelize.INTEGER,

      // Increment the value automatically
      autoIncrement:true,

      // user_id can not be null.
      allowNull:false,

      // To uniquely identify user
      primaryKey:true
   },

   // Name of Column #2: name
   name: { type: Sequelize.STRING, allowNull:false },

   // Name of Column #3: email
   email: { type: Sequelize.STRING, allowNull:false },

   // Column: Timestamps
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
})

module.exports = User