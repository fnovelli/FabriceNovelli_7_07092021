const db = require('../Models/Index');
const jwt = require("../middleware/token");

exports.createPost = async (req, res) => {

    const id = jwt.getUserId(req);

    if (id == null)
    {
      return res.status(400).json({ error: 'unexpected error, cannot get user token' });
    }

    const post = { 
      userId: id,
      message: req.body.message,
      imageUrl: req.body.imageUrl,
  };

  await db.posts.create(post)
        .then(() => res.status(201).json({ post: "Message sent" }))
        .catch(error => res.status(400).json({ error }));

};

exports.getPost = async (req, res) => {
  
  const id = req.params.id;

  db.posts.findByPk(id)
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
      attributes: ["nickname"],

      },
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


