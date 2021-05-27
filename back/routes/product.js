//                                /api/product

const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/product');
const { isUser, isAdmin } = require('../middleware/isUser');

router.post('/', isAdmin, createProduct);
router.get('/', isUser, getProducts);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

module.exports = router;
