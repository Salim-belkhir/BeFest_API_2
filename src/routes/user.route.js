const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl');
//const auth = require('../middlewares/auth')



router.get('/benevoles', userCtrl.getAllBenevoles);

router.get('/:id',userCtrl.getUserById);


router.put('/:id',userCtrl.updateUser);





module.exports = router