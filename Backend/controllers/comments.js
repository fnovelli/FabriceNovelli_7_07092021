const db = require('../Models/Index');
const Comments = db.comments;
const token = require("../middleware/token");

exports.createComment = async (req, res) => {

  try {

    let cookie = req.cookies['user_token'];

    if (cookie) {

      const id = token.getUserId(cookie);
  
      if (id === null)
      {
        return res.status(400).json({ error: 'unexpected error, cannot get user ID' });
      }

      console.log('Req Body: ', req.body);

      const comment = { 
        userId: id,
        postId: req.body.postId,
        comment: req.body.comment,
        imageUrl: req.body.imageUrl,
    };
  
    await Comments.create(comment)
          .then(() => res.status(201).json({ post: "Comment sent" }))
          .catch(error => res.status(400).json({ error }));
    
    } 
    else {
      return res.status(500).send({ error: "Error, couldn't get cookie!" });
  }

  }
  catch (error) {

    
    let cookie2 = req.cookies['user_token'];
    const id2 = token.getUserId(cookie2);
  

    return res.status(500).send({ id2, error: "Error, couldn't get user! Comment cannot be send." });
  }

  return res.status(500).send({ id2, error: "Error, couldn't get user! Comment cannot be send." });

};

exports.getComment = async (req, res) => {
  
  const id = req.params.id;

  await Comments.findOne( {
    where: { id: id },
    attributes: ["id", "comment"],
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
          message: `Cannot find Comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id
      });
    });
};

exports.getAllComments = async (req, res) => {

  Comments.findAll( { 
    attributes: ["id", "comment"],
    order: [["createdAt", "DESC"]],
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
    
}).then((data) => {
  res.send(data);
})
.catch((error) => {
  console.log(error);
});
}

exports.updateComment = (req, res) => {

  try {

    const id = req.params.id;
    Comments.update( req.body, { where: { id: id } }); 
    return res.status(200).json({ message: "Successfully updated comment!" });
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't update comment!" });
  }
};
exports.deleteComment = (req, res) => {

  try {
    const id = req.params.id;
    Comments.destroy({ where: { id: id } }); 
    return res.status(200).json({ message: "Successfully deleted comment!" });
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't delete comment!" });
  }
};


