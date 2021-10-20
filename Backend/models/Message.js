const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')

const Posts = sequelize.define('post', {

    Msg_id:{

        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },

    message: { type: Sequelize.TEXT },
    imageUrl: { type: Sequelize.STRING, allowNull: true },
})


module.exports = Posts
