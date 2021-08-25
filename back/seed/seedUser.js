const User = require('../models/user');
require('../db/db');

const Dario = {
  nombre: 'admin',
  clave: 'admin',
  rol: 'admin',
};

const Checkin = {
  nombre: 'checkin',
  clave: 'checkin',
  rol: 'checkin',
};

const Interior = {
  nombre: 'interior',
  clave: 'interior',
  rol: 'interior',
};
const Tunel = {
  nombre: 'tunel',
  clave: 'tunel',
  rol: 'tunel',
};
const Secado = {
  nombre: 'secado',
  clave: 'secado',
  rol: 'secado',
};
const Parking = {
  nombre: 'parking',
  clave: 'parking',
  rol: 'parking',
};

const Caja = {
  nombre: 'caja',
  clave: 'caja',
  rol: 'caja',
};

const users = [Dario, Checkin, Interior, Tunel, Secado, Parking, Caja];

User.create(users).then(() => {
  console.log('------- corrio el seed User ------');
  process.exit();
});
