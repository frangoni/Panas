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
  tunel: {
    type: Number,
    default: '',
  },
  interior: {
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

serviceSchema.virtual('promedio').get(function () {
  const delay = {};
  delay.tunel = this.tunel - this.checkin;
  delay.interior = this.interior - this.tunel;
  delay.secado = this.secado - this.interior;
  delay.parking = this.parking - this.secado;
  return delay;
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
