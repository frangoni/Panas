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
    ingresos: {},
    clientes: {},
    productos: {},
    promedios: [
      { estacion: 'Tunel', Minutos: 0 },
      { estacion: 'Interior', Minutos: 0 },
      { estacion: 'Secado', Minutos: 0 },
      { estacion: 'Parking', Minutos: 0 },
    ],
  };
  try {
    let services = await Service.find({
      checkin: { $gte: Number(checkinDate) },
      parking: { $lte: Number(parkingDate) },
    })
      .populate('cliente')
      .populate('producto');

    const l = services.length;

    services.map(service => {
      let date = new Date(service.parking);
      let mmyy = `${date.getMonth() + 1}-${date.getFullYear()}`;

      metrics.promedios[0].Minutos += service.promedio.tunel / l;
      metrics.promedios[1].Minutos += service.promedio.interior / l;
      metrics.promedios[2].Minutos += service.promedio.secado / l;
      metrics.promedios[3].Minutos += service.promedio.parking / l;
      metrics.clientes[service.cliente.patente]
        ? (metrics.clientes[service.cliente.patente] += 1)
        : (metrics.clientes[service.cliente.patente] = 1);
      metrics.productos[service.producto.nombre]
        ? (metrics.productos[service.producto.nombre] += 1)
        : (metrics.productos[service.producto.nombre] = 1);
      metrics.ingresos[mmyy]
        ? (metrics.ingresos[mmyy] += service.precio)
        : (metrics.ingresos[mmyy] = service.precio);
    });
    res.status(200).send({ ...metrics, q: l });
  } catch (error) {
    console.log('ERROR AL BUSCAR METRICAS :', error);
    res.status(503).send(error);
  }
};

module.exports = { createService, stationCheck, getServices, getMetrics };
