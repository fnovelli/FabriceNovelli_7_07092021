const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')
const Comments = require('../Models/Comments')

const Posts = sequelize.define('post', {

    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },

    message: { type: Sequelize.TEXT },
    imageUrl: { type: Sequelize.STRING, allowNull: true },
})

Posts.hasMany(Comments, { as: "comments"});
Comments.belongsTo(Posts, {
    foreignKey: "postId",
    as: "post",
});

module.exports = Posts
