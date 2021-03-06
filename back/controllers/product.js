const Product = require('../models/product');

const createProduct = async (req, res) => {
  const product = req.body;
  try {
    const createdProduct = await Product.create(product);
    res.status(201).send(createdProduct);
  } catch (error) {
    res.status(503).send(error);
  }
};
const updateProduct = async (req, res) => {
  const { id, precio, nombre } = req.body;
  try {
    const product = await Product.findById(id);
    nombre.length ? (product.nombre = nombre) : null;
    precio.length ? (product.precio = precio) : null;
    product.save();
    res.status(201).send(product);
  } catch (error) {
    res.send(503, error);
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndUpdate(id, { activo: false });
    res.status(200).send(deletedProduct);
  } catch (error) {
    res.status(503, error);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ activo: true });
    res.status(200).send(products);
  } catch (error) {
    res.status(503, error);
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProducts };
