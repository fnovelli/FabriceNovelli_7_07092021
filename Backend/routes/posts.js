const router = require("express").Router();
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postsCtrl.createPost);
router.get('/:id', auth, postsCtrl.getPost);
router.get('/', postsCtrl.getAllPosts);
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;