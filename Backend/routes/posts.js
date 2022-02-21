const router = require("express").Router();
const postsCtrl = require("../controllers/posts");
const likeCtrl = require('../controllers/likes');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


router.post("/", auth, multer, postsCtrl.createPost);
router.get('/:id', auth, postsCtrl.getPost);
router.get('/', auth, postsCtrl.getAllPosts);
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);

router.post('/:id/like', auth, likeCtrl.likeOnePost);
router.get('/:id/like', auth, likeCtrl.getLikesOfOnePost);
router.delete('/:id/like', auth, likeCtrl.deleteOneLike);


module.exports = router;