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
const updatePrice = async (req, res) => {
  const id = req.params.id;
  const precio = req.body;
  console.log("ID", id, "PRECIO", precio);
  try {
    const product = await Product.findByIdAndUpdate(id, precio);
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

module.exports = { createProduct, updatePrice, deleteProduct };
