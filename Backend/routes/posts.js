const router = require("express").Router();
const postsCtrl = require("../controllers/posts");


router.post("/", postsCtrl.createPost);
router.get('/:id', postsCtrl.getPost);
router.get('/', postsCtrl.getAllPosts);
router.put('/:id', postsCtrl.updatePost);
router.delete('/:id', postsCtrl.deletePost);

module.exports = router;