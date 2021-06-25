const mongoose = require('mongoose');
const { io } = require('../io');
const { Schema, Types } = mongoose;

const serviceSchema = new Schema({
  producto: {
    type: Types.ObjectId,
    ref: 'Product',
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
  abonado: {
    type: Boolean,
    default: false,
  },
  cliente: {
    type: Types.ObjectId,
    ref: 'Client',
  },
  horaEstimada: {
    type: Number,
  },
  checkin: {
    type: Number,
    default: Date.now(),
  },
  interior: {
    type: Number,
    default: '',
  },
  tunel: {
    type: Number,
    default: '',
  },
  secado: {
    type: Number,
    default: '',
  },
  parking: {
    type: Number,
    default: '',
  },
});

serviceSchema.post('save', function (service) {
  io.emit('station');
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
