module.exports = {
  checkRole: async (req, res, next) => {
    if (req.user.isAdmin !== 2) return next();
    res.status(400).send("You are not admin");
  },
};
