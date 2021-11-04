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