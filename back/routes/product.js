//                                /api/product

const express = require("express");
const router = express.Router();
const { createProduct, updatePrice, deleteProduct } = require("../controllers/product");

router.post("/", createProduct);
router.patch("/:id", updatePrice);
router.delete("/:id", deleteProduct);

module.exports = router;
