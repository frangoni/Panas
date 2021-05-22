//                                /api/service

const express = require('express');
const router = express.Router();
const { createService, stationCheck, getServices } = require('../controllers/service');

router.get('/', getServices);
router.post('/', createService);
router.put('/:id', stationCheck);

module.exports = router;
