const Service = require("../models/service");

const createService = async (req, res, next) => {
  const data = req.body;
  try {
    const service = await Service.create(data);
    res.status(201).send(service);
  } catch (error) {
    console.log("ERROR AL CREAR SERVICIO", error);
    res.status(503).send(error);
  }
};

const stationCheck = async (req, res, next) => {
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
