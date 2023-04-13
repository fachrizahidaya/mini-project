const db = require("../../models");
const blog = db.Blog;
const blogCategory = db.Blog_Category;
const category = db.Category;

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
      const pageAsNumber = Number.parseInt(req.query.page);
      const sizeAsNumber = Number.parseInt(req.query.size);
      let page = 0;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }
      let size = 5;
      if (!Number.isNaN(sizeAsNumber) && sizeAsNumber < 10) {
        size = size;
      }

      const data = await blog.findAndCountAll({
        limit: size,
        offset: page * size,
      });
      // const page = parseInt(req.query.page) - 1 || 0;
      // const limit = parseInt(req.query.limit) || 5;
      // const search = req.query.search || "";
      // let sort = req.query.sort || "date";
      // let genre = req.query.genre || "All";

      // const genreOption = await category.findAll({
      //   attributes: ["name"],
      // });
      // genre === "All"
      //   ? (genre = [...genreOption])
      //   : (genre = req.query.genre.split(","));
      // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      // let sortBy = {};
      // if (sort[1]) {
      //   sortBy[sort[0]] = sort[1];
      // } else {
      //   sortBy[sort[0]] = "ASC";
      // }
      res.status(200).send({
        content: data.rows,
        totalPage: Math.ceil(data.count / size),
      });
    } catch (err) {
      console.log(err)
      res.status(400).send(err);
    }
  },
};
