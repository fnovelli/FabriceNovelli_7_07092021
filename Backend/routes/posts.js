const router = require("express").Router();
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", multer, postsCtrl.createPost);
router.get('/:id', auth, postsCtrl.getPost);
router.get('/', postsCtrl.getAllPosts);
router.put('/:id', multer, postsCtrl.updatePost);
router.delete('/:id', multer, postsCtrl.deletePost);

module.exports = router;