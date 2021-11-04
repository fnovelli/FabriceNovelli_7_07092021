const Posts = require('../Models/Posts')
const sequelize = require('../config/my-sql')


exports.createPost = (req, res) => {

    const post = { 
      message: req.body.message,
  };

    Posts.create(post)
    .then(post => {
      return res.status(201).send({ post: "Message posted!" });
  })
  .catch(error => res.status(400).json({ error }));
};

exports.getPost = (req, res) => {
  
  const id = req.params.id;

  Posts.findByPk(id)
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

exports.getAllPosts = (req, res) => {

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  Posts.findAll( { where: condition}).
  then((data) => {
    res.send(data);
  })
.catch((error) => {
    console.log(error);
});
};

exports.updatePost = (req, res) => {
  try {

    const id = req.params.id;
    Posts.update( req.body, { where: { id: id } }); 
    return res.status(200).json({ message: "Successfully updated post!" });
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't update post!" });
  }
};

exports.deletePost = (req, res) => {

  try {
    const id = req.params.id;
    Posts.destroy({ where: { id: id } }); 
    return res.status(200).json({ message: "Successfully deleted post!" });
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't delete post!" });
  }
};




async function createPostTable() {
  const post = Posts.create ({ 
     message: 'NANIIIIIIIIIIIII TEST',
  })

  try { 
  await post.save();

  }
  catch (error) {
     console.error('Unable to save post in DBB.', error);
  }

 await sequelize.sync({force:false});
}

//createPostTable();