const express = require('express');
const router = express.Router();
const creneauCtrl = require('../controllers/creneau.ctrl');



router.get('/jour/:id', creneauCtrl.getAllCreneauOfJour);

router.get('/jour/:idJour/user/:idUser', creneauCtrl.getAllCreneauOfJourForUser);

router.post('/', creneauCtrl.createCreneau);

router.put('/:id', creneauCtrl.updateCreneau);

router.delete('/:id', creneauCtrl.deleteCreneau);



module.exports = router