const db = require('../Models/Index');
const token = require("../middleware/token");

exports.likeOnePost = async (req, res) => {
   
  try {

    let cookie = req.cookies['user_token'];

    if (cookie) {

        const userid = token.getUserId(cookie);
        const likes = db.likes;
        const id = req.params.id;

          const isLiked = likes.findOne({
          where: { userId: userid, postId: id }
        })

       if (isLiked.like) {

        await likes.updateOne({ userId: userid, postId: id }, {
          $inc: { like: -1},
        })
          res.status(200).json({ message: "unliked!"})
        } 
        else {

          await likes.updateOne({ userId: userid, postId: id }, {
            $inc: { like: +1},
          })

          res.status(201).json({ message: "new like!"})
        }
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
      

    }
    catch (error) {

    }

  }