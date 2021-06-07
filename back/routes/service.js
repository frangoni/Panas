//                                /api/service

const express = require('express');
const router = express.Router();
const { createService, stationCheck, getServices, getMetrics } = require('../controllers/service');
const { isUser, isAdmin } = require('../middleware/isUser');

router.get('/', isUser, getServices);
router.post('/', isUser, createService);
router.put('/:id', isUser, stationCheck);
router.get('/metrics', isAdmin, getMetrics);

module.exports = router;
