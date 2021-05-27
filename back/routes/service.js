//                                /api/service

const express = require('express');
const router = express.Router();
const { createService, stationCheck, getServices } = require('../controllers/service');
const { isUser } = require('../middleware/isUser');

router.get('/', isUser, getServices);
router.post('/', isUser, createService);
router.put('/:id', isUser, stationCheck);

module.exports = router;
