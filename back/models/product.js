const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
