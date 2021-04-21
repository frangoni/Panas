//                                /api/service

const express = require("express");
const router = express.Router();
const { createService, stationCheck } = require("../controllers/service");

router.post("/", createService);
router.put("/:id", stationCheck);

module.exports = router;
