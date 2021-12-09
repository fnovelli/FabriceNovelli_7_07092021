const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", userCtrl.createUser);
router.get('/all', userCtrl.getAllUsers);
router.get('/', userCtrl.getUserInformation);
router.put('/update', userCtrl.updateUser);
router.delete('/delete', userCtrl.deleteUser);


router.post('/login', userCtrl.login);
router.get('/logged', userCtrl.isTokenValid);
router.post('/logout', userCtrl.logout);

module.exports = router;