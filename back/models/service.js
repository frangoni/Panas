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
  medioDePago: {
    type: String,
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
  delay.interior = ((this.interior - this.checkin) / 60000).toFixed(2);
  delay.tunel = ((this.tunel - this.interior) / 60000).toFixed(2);
  delay.secado = ((this.secado - this.tunel) / 60000).toFixed(2);
  delay.parking = ((this.parking - this.secado) / 60000).toFixed(2);
  return delay;
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
