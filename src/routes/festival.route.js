const express = require('express');
const router = express.Router();
const festivalCtrl = require('../controllers/festival.ctrl');


router.get('/', festivalCtrl.getAllFestivals);


router.post('/', festivalCtrl.createFestival);


router.put('/:id/close', festivalCtrl.closeFestival);


router.put('/:id', festivalCtrl.updateFestival);


router.delete('/:id', festivalCtrl.deleteFestival);

module.exports = router