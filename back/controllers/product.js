const Product = require("../models/product");

const createProduct = async (req, res) => {
  const product = req.body;
  console.log("product :", product);
  try {
    const createdProduct = await Product.create(product);
    res.status(201).send(createdProduct);
  } catch (error) {
    console.log("ERROR AL CREAR PRODUCTO", error);
    res.status(503).send(error);
  }
};
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { precio, nombre } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, { precio, nombre });
    res.status(301).send(product);
  } catch (error) {
    console.log("ERROR AL CAMBIAR PRECIO", error);
    res.send(503, error);
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(301).send(deletedProduct);
  } catch (error) {
    console.log("ERROR AL BORRAR PRODUCTO", error);
    res.status(503, error);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log("ERROR AL BUSCAR PRODUCTOS:", error);
    res.status(503, error);
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProducts };
