const db = require('../Models/Index');
const token = require("../middleware/token");

exports.createPost = async (req, res) => {

  try {

    let cookie = req.cookies['user_token'];

    if (cookie) {

      const id = token.getUserId(cookie);
  
      if (id === null)
      {
        return res.status(400).json({ error: 'unexpected error, cannot get user ID' });
      }

      const post = { 
        userId: id,
        message: req.body.message,
        imageUrl: req.body.imageUrl,
    };
  
    await db.posts.create(post)
          .then(() => res.status(201).json({ post: "Message sent" }))
          .catch(error => res.status(400).json({ error }));
    
  } else {
     return res.status(500).send({ error: "Error, couldn't get cookie!" });
  }

  }
  catch (error) {

    
    let cookie2 = req.cookies['user_token'];
    const id2 = token.getUserId(cookie2);
  

    return res.status(500).send({ id2, error: "Error, couldn't get user! Message cannot be send." });
  }

};

exports.getPost = async (req, res) => {
  
  const id = req.params.id;

  await db.posts.findOne( {
    where: { id: id },
    attributes: ["id", "message"],
    include: [
      {
      model: db.users, as: "user",
      attributes: ["nickname", "avatar"],

      },
      {
        model: db.comments, as: "com",
        attributes: ["comment", "id"]
      }
    ],
  }
  )
  .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Message with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving message with id=" + id
      });
    });
};

exports.getAllPosts = async (req, res) => {

  db.posts.findAll( { 
    attributes: ["id", "message"],
    include: [
      {
      model: db.users, as: "user",
      attributes: ["nickname", "avatar"],

      },
      {
        model: db.comments, as: "com",
        attributes: ["comment", "id"]
      }
    ],
    
}).then((data) => {
  res.send(data);
})
.catch((error) => {
  console.log(error);
});
}

exports.updatePost = async (req, res) => {
  try {

    const id = req.params.id;
    db.posts.update( req.body, { where: { id: id } }); 
    return res.status(200).json({ message: "Successfully updated post!" });
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't update post!" });
  }
};
exports.deletePost = (req, res) => {

  try {
    const id = req.params.id;
    db.posts.destroy({ where: { id: id } }); 
    return res.status(200).json({ message: "Successfully deleted post!" });
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't delete post!" });
  }
};


