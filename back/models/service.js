const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const serviceSchema = new Schema({
  horaDeEntrada: {
    type: Date,
    default: Date.now,
  },
  horaEstimada: {
    type: Date,
  },
  precio: {
    type: Number,
  },
  estado: {
    type: String,
  },
  observaciones: {
    type: String,
  },
  abondado: {
    type: Boolean,
    default: false,
  },
  producto: {
    type: Types.ObjectId,
    ref: "Product",
  },
  cliente: {
    type: Types.ObjectId,
    ref: "Client",
  },
  estacion1: {
    type: String,
  },
  // VER CUANTAS ESTACIONES CON DARÍO
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
