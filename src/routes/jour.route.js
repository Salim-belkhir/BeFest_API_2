const express = require('express');
const router = express.Router();
const jourCtrl = require('../controllers/jour.ctrl');
const auth = require('../middlewares/auth');





router.get('/festival/:id', jourCtrl.getAllJoursOfFestival);

router.post('/', jourCtrl.createJour);

router.put('/:id', jourCtrl.updateJour);

router.delete('/:id', jourCtrl.deleteJour);


module.exports = router