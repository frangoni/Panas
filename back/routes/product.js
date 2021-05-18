//                                /api/product

const express = require("express");
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts } = require("../controllers/product");

router.post("/", createProduct);
router.get("/", getProducts);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
