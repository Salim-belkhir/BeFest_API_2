const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl');
const auth = require('../middlewares/auth');



router.get('/:id', auth, userCtrl.getUserById);


router.put('/:id', auth , userCtrl.updateUser);


module.exports = router