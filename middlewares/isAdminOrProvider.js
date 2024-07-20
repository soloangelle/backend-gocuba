const isAdminOrProvider = (req, res, next) => {
    if (req.user && (req.user.role === 'ADMIN_ROLE' || req.user.role === 'PROVIDER_ROLE')) {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado: No tienes los permisos necesarios.' });
    }
  };
module.exports = isAdminOrProvider;