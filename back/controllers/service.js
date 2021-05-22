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
  try {
    const services = await Service.find().populate('cliente');
    res.status(201).send(services);
  } catch (error) {
    console.log('ERROR AL TRAER SERVICIOS', error);
    res.status(503).send(error);
  }
};

const stationCheck = async (req, res) => {
  const { station } = req.params;
  const serviceId = req.body.id;
  const check = {};
  check[station] = Date.now();
  try {
    const service = await Service.updateOne({ id: serviceId }, check);
    res.status(301).send(service);
  } catch (error) {
    console.log('ERROR EN CHECK DE ESTACIÓN', error);
    res.status(503).send(error);
  }
};

module.exports = { createService, stationCheck, getServices };
