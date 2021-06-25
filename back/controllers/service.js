const Service = require('../models/service');
const Client = require('../models/client');
const sendEmail = require('../email');

const createService = async (req, res) => {
  const { client, service } = req.body;
  try {
    let clientDB = await Client.findOne({ patente: client.patente });
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
  try {
    const service = await Service.findById(serviceId).populate('cliente');
    service[station] = Date.now();
    service.save();
    const { email, nombre } = service.cliente;
    const whom = nombre.substr(0, nombre.indexOf(' '));
    station == 'parking' ? sendEmail(email, whom) : null;

    res.status(201).send(service);
  } catch (error) {
    console.log('ERROR EN CHECK DE ESTACIÓN', error);
    res.status(503).send(error);
  }
};

const getMetrics = async (req, res) => {
  const { checkinDate, parkingDate } = req.query;
  const metrics = {};
  try {
    const services = await Service.find({ where: { checkin: { $gte: +checkinDate }, parking: { $lte: +parkingDate } } });
    console.log('services :', services);
    res.status(200).send(services);
  } catch (error) {
    console.log('ERROR AL BUSCAR METRICAS :', error);
    res.status(503).send(error);
  }
};

module.exports = { createService, stationCheck, getServices, getMetrics };
