const User = require('../models/User');
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

User.create([Dario, Checkin]).then(() => {
  console.log('------- corrio el seed User ------');
  process.exit();
});
