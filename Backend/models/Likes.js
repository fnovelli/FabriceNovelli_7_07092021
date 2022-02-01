module.exports = (sequelize, Sequelize) => {
   const Likes = sequelize.define("likes", {
 
     like: { type: Sequelize.INTEGER, required: true, default: 0},
   });

   return Likes;
};
