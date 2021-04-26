//                                /api/client

const express = require("express");
const router = express.Router();
const { findClient } = require("../controllers/client");

router.get("/:patente", findClient);

module.exports = router;
