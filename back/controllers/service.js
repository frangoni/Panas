const Service = require('../models/service');
const Client = require('../models/client');
const { sendEmail, sendWhatsapp } = require('../email');

const createService = async (req, res) => {
  const { client, service } = req.body;
  try {
    let clientDB = await Client.findOne({ patente: client.patente });
    if (!clientDB) clientDB = await Client.create(client);
    const serviceDB = await Service.create({ ...service, cliente: clientDB });
    res.status(201).send(serviceDB);
  } catch (error) {
    res.status(503).send(error);
  }
};

const getServices = async (req, res) => {
  const rol = req.user.rol;
  const where = { [rol]: null };
  const options = () => {
    switch (rol) {
      case 'interior':
        return where;
      case 'tunel':
        return { ...where, interior: { $ne: null } };
      case 'secado':
        return { ...where, tunel: { $ne: null } };
      case 'parking':
        return { ...where, secado: { $ne: null } };
      case 'caja':
        return { abonado: false };
    }
  };
  try {
    const services = await Service.find(options()).populate('producto').populate('cliente');
    res.status(201).send(services);
  } catch (error) {
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
    const { email, nombre, telefono } = service.cliente;
    const whom = nombre.substr(0, nombre.indexOf(' '));
    station == 'secado' ? sendEmail(email, whom) : null;
    station == 'secado' ? sendWhatsapp(nombre, telefono) : null;
    res.status(201).send(service);
  } catch (error) {
    res.status(503).send(error);
  }
};

const getServicesByPlate = async (req, res) => {
  const patente = req.params.patente;
  try {
    const cliente = await Client.findOne({ patente });
    const services = await Service.find({ cliente }).populate('producto').populate('cliente');
    res.status(201).send(services);
  } catch (error) {
    res.status(404).send(error);
  }
};

const setPaid = async (req, res) => {
  const serviceId = req.params.id;
  const method = req.params.method;
  try {
    const service = await Service.findById(serviceId);
    service.abonado = true;
    service.medioDePago = method;
    service.save();
    return service;
  } catch (error) {
    return error;
  }
};

const getMetrics = async (req, res) => {
  const { checkinDate, parkingDate } = req.query;
  const metrics = {
    ingresosEnEfectivo: {},
    ingresosEnTarjeta: {},
    ingresos: { tarjeta: {}, efectivo: {} },
    clientes: {},
    productos: {},
    promedios: [
      { estacion: 'Interior', Minutos: 0 },
      { estacion: 'Tunel', Minutos: 0 },
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
      let yyyy = date.getFullYear();
      let mm = date.getMonth() + 1;
      let yyyymm = `${yyyy}-${mm.toString().length == 1 ? `0${mm}` : mm}`;

      metrics.promedios[0].Minutos += service.promedio.interior / l;
      metrics.promedios[1].Minutos += service.promedio.tunel / l;
      metrics.promedios[2].Minutos += service.promedio.secado / l;
      metrics.promedios[3].Minutos += service.promedio.parking / l;
      metrics.clientes[service.cliente.patente]
        ? (metrics.clientes[service.cliente.patente] += 1)
        : (metrics.clientes[service.cliente.patente] = 1);
      metrics.productos[service.producto.nombre]
        ? (metrics.productos[service.producto.nombre] += 1)
        : (metrics.productos[service.producto.nombre] = 1);

      service.medioDePago == 'efectivo'
        ? metrics.ingresos.efectivo[yyyymm]
          ? (metrics.ingresos.efectivo[yyyymm] += service.precio)
          : (metrics.ingresos.efectivo[yyyymm] = service.precio)
        : metrics.ingresos.tarjeta[yyyymm]
        ? (metrics.ingresos.tarjeta[yyyymm] += service.precio)
        : (metrics.ingresos.tarjeta[yyyymm] = service.precio);
    });
    res.status(200).send({ ...metrics, q: l });
  } catch (error) {
    res.status(503).send(error);
  }
};

module.exports = {
  createService,
  stationCheck,
  getServices,
  getMetrics,
  setPaid,
  getServicesByPlate,
};
