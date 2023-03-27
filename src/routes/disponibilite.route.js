const express = require('express');
const router = express.Router();
const disponibiliteCtrl = require('../controllers/disponibilite.ctrl');



router.get('/user/:idUser/festival/:idFestival', disponibiliteCtrl.getAllDisponibiliteOfUser);


router.get('/creneau/:id', disponibiliteCtrl.getAllDisponibiliteOfCreneau);


router.post('/', disponibiliteCtrl.createDisponibilite);


router.put('/:id', disponibiliteCtrl.updateDisponibilite);


router.delete('/:id', disponibiliteCtrl.deleteDisponibilite);



module.exports = router