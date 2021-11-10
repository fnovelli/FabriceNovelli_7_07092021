const Sequelize = require('sequelize')
const sequelize = require('../config/my-sql')


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


async function createPostTable() {
    const post = Posts.create ({ 
       message: 'test msg',
    })
  
    try { 
    await post.save();
  
    }
    catch (error) {
       console.error('Unable to save post in DBB.', error);
    }
  
   await sequelize.sync({force:true});
  }
  
//createPostTable();

module.exports = Posts
