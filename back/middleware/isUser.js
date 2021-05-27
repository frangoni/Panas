const isUser = async (req, res, next) => {
  if (req.user && req.user.rol) {
    console.log('IS USER :>> ', req.user.rol);
    return next();
  }
  res.status(401).send({ error: 'No posee permisos para realizar la accion' });
};

const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    return next();
  }
  res.status(401).send({ error: 'No posee permisos para realizar la accion' });
};

module.exports = { isUser, isAdmin };
