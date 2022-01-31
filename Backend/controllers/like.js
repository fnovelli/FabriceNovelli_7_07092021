const db = require('../Models/Index');
const token = require("../middleware/token");


exports.likePost = (req, res, next) => {

    let cookie = req.cookies['user_token'];
    const userid = token.getUserId(cookie);
    const isliked = req.body.like

    await db.posts.findOne({
      
        where: { id: req.params.id },
    })
    .then(post => {

        if (!post) {
            return res.status(404).json({ error: 'Error, cannot get message ID!' })
        } 

        return res.status(201).json({ message: 'post liked' });
    })
}
