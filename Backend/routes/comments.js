const router = require("express").Router();
const commentsCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, commentsCtrl.createComment);
router.get('/:id', auth, commentsCtrl.getComment);
router.get('/', auth, commentsCtrl.getAllComments);
router.put('/:id', auth, multer, commentsCtrl.updateComment);
router.delete('/:id', auth, multer, commentsCtrl.deleteComment);

module.exports = router;