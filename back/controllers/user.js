const User = require('../models/user');

const register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = (req, res, next) => {
  const { nombre, rol } = req.user;
  res.send({ nombre, rol });
};

const logOut = (req, res, next) => {
  req.logOut();
  res.sendStatus(200);
};

const me = (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const { nombre, rol } = req.user;
  res.send({ nombre, rol });
};

module.exports = { register, login, logOut, me };
