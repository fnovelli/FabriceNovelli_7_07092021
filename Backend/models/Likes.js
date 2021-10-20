const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')

const Likes = sequelize.define('like', {

   likes: { type: Sequelize.NUMBER },

   dislikes: { type: Sequelize.NUMBER },

   usersLiked: { type: Sequelize.STRING },
   usersDisliked: { type: Sequelize.STRING },
})


module.exports = Likes
