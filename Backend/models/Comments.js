const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')
const Users = require('../models/User')

const Comments = sequelize.define('comment', {

    id:{

        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },

    message: { type: Sequelize.TEXT },
    imageUrl: { type: Sequelize.STRING, allowNull: true },
    author: { 
        type: Sequelize.STRING, 
        allowNull: false },
})


module.exports = Comments
