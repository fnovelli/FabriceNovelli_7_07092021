




module.exports = (sequelize, Sequelize) => {
   const Comments = sequelize.define("comment", {

      id:{

         type:Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
      },
 
     comment: { type: Sequelize.TEXT },
     imageUrl: { type: Sequelize.STRING, allowNull: true },
   });

   return Comments;
};


/*async function createCommentTable() {
    const comment = Comments.create ({ 
       comment: 'test msg',
    })
  
    try { 
    await comment.save();
  
    }
    catch (error) {
       console.error('Unable to save comment in DBB.', error);
    }
  
   await sequelize.sync({force:true});
  }*/
  
//createCommentTable();

