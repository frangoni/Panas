const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const serviceSchema = new Schema({
  producto: {
    type: Types.ObjectId,
    ref: "Product",
  },
  precio: {
    type: Number,
  },
  horaDeEntrada: {
    type: Date,
    default: Date.now,
  },
  horaEstimada: {
    type: Date,
  },
  estado: {
    type: String,
  },
  observaciones: {
    type: String,
  },
  abonado: {
    type: Boolean,
    default: false,
  },
  cliente: {
    type: Types.ObjectId,
    ref: "Client",
  },
  checkin: {
    type: Date,
    default: Date.now(),
  },
  interior: {
    type: Date,
  },
  tunel: {
    type: Date,
  },
  secado: {
    type: Date,
  },
  parking: {
    type: Date,
  },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
