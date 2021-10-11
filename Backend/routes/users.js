const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

//router.post("/", userCtrl.createJaneUser);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUserAccount);
router.get('/:id', userCtrl.updateUser);
router.get('/:id', userCtrl.deleteUser);


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



module.exports = router;