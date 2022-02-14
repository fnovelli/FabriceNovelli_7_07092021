const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");

router.post("/", userCtrl.createUser);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUser);

router.post('/edit', auth, userCtrl.updateUser);
router.delete('/', auth, userCtrl.deleteUser);


router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);

module.exports = router;