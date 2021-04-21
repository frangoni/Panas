const Client = require("../models/client");

const createClient = async (req, res, next) => {
  const data = req.body;
  try {
    const newClient = await Client.create(data);
    res.status(201).send(newClient);
  } catch (error) {
    console.log("ERROR AL CREAR CLIENTE", error);
    res.status(503).send(error);
  }
};

const findClient = async (req, res, next) => {
  const patente = req.body;
  try {
    const cliente = await Client.findOne(patente);
    res.status(201).send(cliente);
  } catch (error) {
    console.log("ERROR AL BUSCAR CLIENTE", cliente);
    res.status(501).send(error);
  }
};

module.exports = { createClient, findClient };
