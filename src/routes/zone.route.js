const express = require("express");
const router = express.Router();
const zoneCtrl = require('../controllers/zone.ctrl')



router.get('/festival/:id', zoneCtrl.getAllZonesOfFestival);

router.post('', zoneCtrl.createZone);

router.put('/:id', zoneCtrl.updateZone);

router.delete('/:id', zoneCtrl.deleteZone);

module.exports = router