module.exports = (sequelize, Sequelize) => {
   const Likes = sequelize.define("likes", {
 
     like: { type: Sequelize.INTEGER, allowNull: true },
   });

   return Likes;
};
