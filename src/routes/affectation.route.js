const express = require('express');
const router = express.Router();
const affectationCtrl = require('../controllers/affectation.ctrl');
const auth = require('../middlewares/auth');


//TODO: Affectation controller

router.get('/', affectationCtrl.getAllAffectation);


router.get('/user/:id', affectationCtrl.getAllAffectationOfUser);

router.get('/zone/:id_zone/creneau/:id_creneau', affectationCtrl.getAllAffectationOfZoneForCreneau);

router.get('/creneau/:id', affectationCtrl.getAllAffectationOfCreneau);


router.post('/', affectationCtrl.createAffectation);

router.put('/:id',[auth.isAdmin || auth.verifyToken] ,affectationCtrl.updateAffectation);

router.delete('/:id', affectationCtrl.deleteAffectation);


module.exports = router