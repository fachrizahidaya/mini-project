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
      const { id_cat, search, sort, size } = req.query;
      const cat1 = id_cat;
      const sort1 = sort || "DESC";
      const page1 = parseInt(req.query.page) + 1 || 1;
      const size1 = parseInt(size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;
      const result = await blog.findAll({
        where: {
          [Op.and]: [
            {
              CategoryId: {
                [Op.like]: `%${cat1}%`,
              },
            },
            {
              title: { [Op.like]: `%${search1}%` },
            },
          ],
        },
        attributes: ["id", "title", "CategoryId"],
        include: [
          {
            model: user,
            attributes: ["username"],
          },
          {
            model: category,
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", `${sort1}`]],
        limit: size1,
        offset: start,
        raw: true,
      });
      const totalRows = await blog.count({
        where: {
          [Op.and]: [
            {
              CategoryId: {
                [Op.like]: `%${cat1}%`,
              },
            },
            {
              title: { [Op.like]: `%${search1}%` },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / size1);
      res.status(200).send({
        page: totalPage,
        rows: totalRows,
        blogPage: page1,
        listLimit: size1,
        result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
