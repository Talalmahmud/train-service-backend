const checkRoles = (userRoles) => {
  async (req, res, next) => {
    const { roles } = req.user;
    if (roles.includes(userRoles)) {
      next();
    }
    res.status(301).json({ messsage: "Unauthorized user." });
  };
};

module.exports = checkRoles;
