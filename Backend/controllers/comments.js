const db = require('../Models/Index');
const Comments = db.comments;

exports.createComment = async (req, res) => {

  const comment = { 
    userId: req.body.userId,
    msgId: req.body.msgId,
    comment: req.body.comment,
    imageUrl: req.body.imageUrl,
};

await Comments.create(comment)
      .then(() => res.status(201).json({ comment: "Comment sent" }))
      .catch(error => res.status(400).json({ error }));
};

exports.getComment = (req, res) => {
  
  const id = req.params.id;

  Comments.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving comment with id=" + id
      });
    });
};

exports.getAllComments = (req, res) => {

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  Comments.findAll( { where: condition}).
  then((data) => {
    res.send(data);
  })
.catch((error) => {
    console.log(error);
});
};

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


