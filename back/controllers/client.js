const Client = require('../models/client');

const findClient = async (req, res) => {
  const patente = req.params;
  try {
    const cliente = await Client.findOne(patente);
    res.status(201).send(cliente);
  } catch (error) {
    res.status(501).send(error);
  }
};

module.exports = { findClient };
