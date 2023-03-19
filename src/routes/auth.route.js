var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/auth.ctrl');
var verifySignup = require('../middlewares/verifySignup');


router.post('/signup', [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted], authCtrl.signup);


router.post('/signin', authCtrl.signin);


module.exports = router