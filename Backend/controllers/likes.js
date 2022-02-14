const db = require('../Models/Index');
const token = require("../middleware/token");

exports.likeOnePost = async (req, res) => {
   
  try {

    let cookie = req.cookies['user_token'];

    if (cookie) {

        const userid = token.getUserId(cookie);
        const id = req.params.id;

        const like = { 
          userId: userid,
          postId: id,
          like: 1,
        };
      
        db.likes.create(like)
        .then(like => {    
          res.status(201).json({ message: "liked!"});
      })
      .catch(error => res.status(400).json({ error }));
      }

    } catch (error) {
      res.status(400).json({ error })
    }
  }
   
  exports.getLikesOfOnePost = async (req, res) => {
    
    try {

      const likes = db.likes;

      const all = await likes.findAll({
        where: { postId: req.params.postId },
        include: db.users
      })
      res.status(200).json({ all })
    } 
    catch (error) {
      res.status(400).json({ error })
    }
  }

  exports.deleteOneLike = async (req, res) =>  {

    try {
      let cookie = req.cookies['user_token'];
      const userid = token.getUserId(cookie);
      let like = await db.likes.findOne({ where: { id: req.params.id } });
      let isAdmin = false;
  
      db.users.findByPk(userid)
      .then(data => {
        if (data) {
          isAdmin = data.admin;
        }
      });
  
      if (userid !== like.userId && !isAdmin)
      {
        return res.status(403).send({ error: "Error, you don't have the permission to do that." });
      }
  
      const id = req.params.id;
      db.likes.destroy({ where: { id: id } }); 
      return res.status(200).json({ message: "Successfully unliked post!" });

    }
    catch (error) {

    }

  }