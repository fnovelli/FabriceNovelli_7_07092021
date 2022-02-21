const db = require('../Models/Index');
const token = require("../middleware/token");
const Like = db.likes;

exports.likeOnePost = async (req, res) => {
   
  try {

  let cookie = req.cookies['user_token'];

  if (!cookie)
  {
    return res.status(404).send({ error: "Fatal error, user not logged." });
  }

  const userid = token.getUserId(cookie);
  const msgid = req.params.id;

  Like.findOne({ where : { postId: msgid }}) 
  .then(like => {

    if (like.userId === userid) {
    
      Like.destroy({ where: { id: like.id } }); 
      return res.status(201).send({ like: "You don't like this post anymore." });
    }
  })
  .catch(no => { 

    const like = { 
      userId: userid,
      postId: msgid,
      like: 1,
    };

    Like.create(like)
      .then(() => res.status(201).json({ like: "Message liked" }))
      .catch(error => res.status(400).json({ error }));

  });
}
catch
{
  return res.status(501).send({ error: "Error couldn't like the message." });
}
}

   
exports.getLikesOfOnePost = async (req, res) => {

    let cookie = req.cookies['user_token'];

    if (!cookie)
    {
      return res.status(404).send({ error: "Fatal error, user not logged." });
    }


  const msgid = req.params.id;

      Like.findOne( {
      where: {postId: msgid },
      attributes: ["like"],
      include: [
        {
        model: db.users, as: "user",
        attributes: ["nickname", "avatar"],
  
        },
        {
          model: db.posts, as: "post",
          attributes: ["message", "id"]
        }
      ],
    }
    )
    .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Like with post id=${msgid}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving like with post id=" + msgid
        });
      });
  
  }

  exports.deleteOneLike = async (req, res) =>  {

    let cookie = req.cookies['user_token'];

    if (!cookie)
    {
      return res.status(404).send({ error: "Fatal error, user not logged." });
    }
    const userid = token.getUserId(cookie);
    const msgid = req.params.id;
  
    Like.findOne({ where : { postId: msgid }}) 
    .then(like => {

      Like.destroy({ where: { id: like.id } }); 
      return res.status(201).send({ message: "You don't like this post anymore." });

    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving like with post id=" + msgid
      });
    });

  }