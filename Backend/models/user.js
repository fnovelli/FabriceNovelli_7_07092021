
module.exports = (sequelize, Sequelize) => {

   const Users = sequelize.define("users", {

      id:{
         // Integer Datatype
         type:Sequelize.INTEGER,
   
         // Increment the value automatically
         autoIncrement: true,
   
         // user_id can not be null.
         allowNull: false,
   
         // To uniquely identify user
         primaryKey: true
      },
   
      name: { type: Sequelize.STRING, allowNull:false },
   
      nickname: { type: Sequelize.STRING, allowNull:false },
   
      email: { type: Sequelize.STRING, allowNull:false, unique: true },
      
      password: { type: Sequelize.STRING, allowNull:false },
    
      admin: { type: Sequelize.BOOLEAN, allowNull:false, defaultValue: false },

      avatar: { type: Sequelize.STRING, allowNull: true },

      bio: { type: Sequelize.TEXT, allowNull: true },
   });

   return Users;
};


