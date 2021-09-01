const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido'],
  },
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
    set: telefono => Number(`54011${telefono}`),
  },
  //GUARDAR CON MAYUSCULA Y SIN ESPACIOS
  patente: {
    type: String,
    unique: true,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
