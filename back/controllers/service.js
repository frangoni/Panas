const Service = require("../models/service");
const Client = require("../models/client");

const createService = async (req, res) => {
  const { client, service } = req.body;
  console.log("client :", client);
  try {
    const clientDB = await Client.findOne({ patente: client.patente });
    if (!clientDB) clientDB = await Client.create(client);
    console.log("clientDB :", clientDB);
    const serviceDB = await Service.create({ ...service, cliente: clientDB });
    res.status(201).send(serviceDB);
  } catch (error) {
    console.log("ERROR AL CREAR SERVICIO", error);
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
    console.log("ERROR EN CHECK DE ESTACIÓN", error);
    res.status(503).send(error);
  }
};

module.exports = { createService, stationCheck };
