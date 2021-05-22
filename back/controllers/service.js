const Service = require('../models/service');
const Client = require('../models/client');

const createService = async (req, res) => {
  const { client, service } = req.body;
  try {
    const clientDB = await Client.findOne({ patente: client.patente });
    if (!clientDB) clientDB = await Client.create(client);
    const serviceDB = await Service.create({ ...service, cliente: clientDB });
    res.status(201).send(serviceDB);
  } catch (error) {
    console.log('ERROR AL CREAR SERVICIO', error);
    res.status(503).send(error);
  }
};

const getServices = async (req, res) => {
  const rol = req.user.rol;
  const where = { [rol]: null };
  const options = () => {
    switch (rol) {
      case 'tunel':
        return where;
      case 'interior':
        return { ...where, tunel: { $ne: null } };
      case 'secado':
        return { ...where, interior: { $ne: null } };
      case 'parking':
        return { ...where, secado: { $ne: null } };
      case 'admin':
        return { ...where, parking: { $ne: null } };
    }
  };
  try {
    const services = await Service.find(options()).populate('cliente');
    res.status(201).send(services);
  } catch (error) {
    console.log('ERROR AL TRAER SERVICIOS', error);
    res.status(503).send(error);
  }
};

const stationCheck = async (req, res) => {
  const station = req.user.rol;
  const serviceId = req.params.id;
  const check = {};
  check[station] = Date.now();
  try {
    const service = await Service.findById(serviceId);
    service[station] = Date.now();
    service.save();
    res.status(201).send(service);
  } catch (error) {
    console.log('ERROR EN CHECK DE ESTACIÓN', error);
    res.status(503).send(error);
  }
};

module.exports = { createService, stationCheck, getServices };
