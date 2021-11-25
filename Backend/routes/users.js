const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post("/", userCtrl.createUser);
router.get('/', userCtrl.getAllUsers);

router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);


router.post('/login', userCtrl.login);
router.get('/logged', userCtrl.isTokenValid);

module.exports = router;