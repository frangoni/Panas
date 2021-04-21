const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    console.log("ERROR EN REGISTRO", error);
    res.status(400).send(error);
  }
};

const login = (req, res, next) => {
  res.send(req.user);
};

const logOut = (req, res, next) => {
  req.logOut();
  res.sendStatus(200);
};

const me = (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  res.send(req.user);
};

module.exports = { register, login, logOut, me };
