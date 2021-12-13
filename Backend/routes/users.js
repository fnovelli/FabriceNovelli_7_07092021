const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", userCtrl.createUser);
router.get('/', userCtrl.getAllUsers);
//router.get('/:id', userCtrl.getUserInformation);
router.get('/@me', userCtrl.getUserInformation);
router.put('/', userCtrl.updateUser);
router.delete('/', userCtrl.deleteUser);


router.post('/login', userCtrl.login);
router.get('/logged', userCtrl.isTokenValid);
router.post('/logout', userCtrl.logout);

module.exports = router;