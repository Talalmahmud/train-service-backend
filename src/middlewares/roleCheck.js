const checkRoles = (allowedRoles) => (req, res, next) => {
  const userRole = req.user.role;

  if (allowedRoles.includes(userRole)) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden: You do not have the required role" });
  }
};

module.exports = checkRoles;
