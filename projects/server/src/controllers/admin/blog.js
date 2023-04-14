const { Sequelize, Op } = require("sequelize");
const db = require("../../models");
const blog = db.Blog;
const blogCategory = db.Blog_Category;
const category = db.Category;
const user = db.User;

module.exports = {
  allBlog: async (req, res) => {
    try {
      const data = await blog.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: blogCategory,
            attributes: ["CategoryId"],
            include: [{ model: category, attributes: ["name"] }],
          },
        ],
      });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  allCategory: async (req, res) => {
    try {
      const data = await category.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  pagBlog: async (req, res) => {
    try {
      const { id_cat, search, sort } = req.query;
      const page1 = parseInt(req.query.page);
      const size1 = parseInt(req.query.size);
      const result = await blog.findAll({
        include: [
          {
            model: blogCategory,
            attributes: [],
            include: [
              {
                model: category,
                attributes: [],
                where: { id: id_cat },
              },
            ],
          },
          {
            model: user,
            attributes: [],
          },
        ],
        where: { title: { [Op.like]: `%${search}%` } },
        order: [["createdAt", `${sort}`]],
        limit: size1,
        offset: page1,
        raw: true,
      });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
