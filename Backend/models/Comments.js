const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')
const Users = require('../models/User')
const Posts = require('../models/Posts')

const Comments = sequelize.define('comment', {

    id:{

        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },

    comment: { type: Sequelize.TEXT },
    imageUrl: { type: Sequelize.STRING, allowNull: true },
    author: { 
        type: Sequelize.STRING, 
        allowNull: false },
    msgId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },

})


module.exports = Comments
