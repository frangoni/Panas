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
  const metrics = {
    ingresos: 0,
    clientes: {},
    productos: {},
    promedios: { tunel: 0, interior: 0, secado: 0, parking: 0 },
  };
  try {
    let services = await Service.find({
      checkin: { $gte: Number(checkinDate) },
      parking: { $lte: Number(parkingDate) },
    })
      .populate('cliente')
      .populate('producto');

    const l = services.length;
    console.log('services :', services);

    services.map(service => {
      metrics.promedios.tunel += service.promedio.tunel / l;
      metrics.promedios.interior += service.promedio.interior / l;
      metrics.promedios.secado += service.promedio.secado / l;
      metrics.promedios.parking += service.promedio.parking / l;
      metrics.ingresos += service.precio;
      metrics.clientes[service.cliente.patente]
        ? (metrics.clientes[service.cliente.patente] += 1)
        : (metrics.clientes[service.cliente.patente] = 1);
      metrics.productos[service.producto.nombre]
        ? (metrics.productos[service.producto.nombre] += 1)
        : (metrics.productos[service.producto.nombre] = 1);
    });
    res.status(200).send({ ...metrics, q: l });
  } catch (error) {
    console.log('ERROR AL BUSCAR METRICAS :', error);
    res.status(503).send(error);
  }
};

module.exports = { createService, stationCheck, getServices, getMetrics };
