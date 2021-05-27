//                                /api/client

const express = require('express');
const router = express.Router();
const { findClient } = require('../controllers/client');
const { isUser } = require('../middleware/isUser');

router.get('/:patente', isUser, findClient);

module.exports = router;
