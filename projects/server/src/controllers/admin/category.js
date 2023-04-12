const db = require("../../models");
const category = db.Category;

module.exports = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const result = await category.create({
        name,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAll: async (req, res) => {
    try {
      const data = await category.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
