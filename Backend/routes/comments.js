const router = require("express").Router();
const commentsCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", multer, commentsCtrl.createComment);
router.get('/:id', commentsCtrl.getComment);
router.get('/', commentsCtrl.getAllComments);
router.put('/:id', multer, commentsCtrl.updateComment);
router.delete('/:id', commentsCtrl.deleteComment);

module.exports = router;