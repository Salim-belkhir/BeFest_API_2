const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl');
const auth = require('../middlewares/auth')



router.get('/benevoles', userCtrl.getAllBenevoles);

router.get('/:id', auth.verifyToken ,userCtrl.getUserById);


router.put('/:id', auth.verifyToken, userCtrl.updateUser);





module.exports = router