const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')

const Comments = sequelize.define('post', {

    id:{

        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },

    message: { type: Sequelize.TEXT },
    imageUrl: { type: Sequelize.STRING, allowNull: true },
})


module.exports = Comments
