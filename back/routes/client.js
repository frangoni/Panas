//                                /api/client

const express = require("express");
const router = express.Router();
const { createClient, findClient } = require("../controllers/client");

router.get("/", findClient);
router.post("/", createClient);

module.exports = router;
