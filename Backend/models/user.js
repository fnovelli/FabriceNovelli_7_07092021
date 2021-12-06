
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
   });

   return Users;
};


/*async function createJaneUser() {
   const jane = Users.build({ 
      name: 'Jane',
      nickname: 'Jaja',
      email: 'jane@gmail.com',
      password: 'passw0rd',
      admin: false
   })

   console.log(jane.name);
   console.log(jane.nickname);
   try { 
   await jane.save();
   console.log("user " + jane.name + " has been added in the database.");
   }
   catch (error) {
      console.error('Unable to save user in DBB.', error);
   }


  await sequelize.sync({force:false});
}

//createJaneUser();*/
