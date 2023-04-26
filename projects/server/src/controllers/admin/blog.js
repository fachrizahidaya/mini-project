const { Sequelize, Op } = require("sequelize");
const db = require("../../models");
const blog = db.Blog;
const blogCategory = db.Blog_Category;
const category = db.Category;
const user = db.User;
const keyword = db.Keyword;
const blogKeyword = db.Blog_Keyword;

module.exports = {
  allBlog: async (req, res) => {
    try {
      const data = await blog.findAll(
        {
          order: [["createdAt", "DESC"]],
        },
        {
          where: {
            isDeleted: false,
          },
        }
      );
      res.status(200).send(data);
    } catch (err) {
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
      const { id_cat, search, sort, size, id_key } = req.query;
      const cat1 = id_cat;
      const idKey1 = id_key;
      // parseInt(req.query.id_key);
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
            {
              isDeleted: false,
            },
            // {
            //   "$Blog_Keyword.Keyword.id$": { [Op.like]: `%${idKey1}%` },
            // },
          ],
        },
        // attributes: ["id", "title", "CategoryId"],
        order: [["createdAt", `${sort1}`]],
        limit: size1,
        offset: start,
        include: [
          {
            model: user,
            attributes: ["username"],
          },
          {
            model: category,
            attributes: ["id", "name"],
          },
          {
            model: blogKeyword,
            where: {
              KeywordId:
                // "$Blog_Keyword.Keyword.id$"
                { [Op.like]: `%${idKey1}%` },
            },
            include: [{ model: keyword }],
          },
        ],
        // raw: true,
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
            {
              isDeleted: false,
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
      res.status(400).send(err);
      console.log(err);
    }
  },

  createKey: async (req, res) => {
    try {
      const { name } = req.body;
      const data = await keyword.create({
        name: name,
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  save: async (req, res) => {
    try {
      const { id_cat, search, sort, size, id_key } = req.query;
      const cat1 = id_cat;
      const idKey1 = id_key;
      const sort1 = sort || "DESC";
      const page1 = parseInt(req.query.page) + 1 || 1;
      const size1 = parseInt(size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;
      const blogs = await blogKeyword.findAll({
        include: [
          {
            model: blog,
            include: [
              {
                model: user,
                attributes: ["id", "username"],
              },
              {
                model: category,
                attributes: ["id", "name"],
              },
            ],
            where: {
              title: {
                [Op.like]: "%%",
              },
              CategoryId: {
                [Op.like]: "%%",
              },
            },
            order: [["createdAt", "DESC"]],
          },
          {
            model: keyword,
            attributes: ["id", "name"],
            where: {
              id: {
                [Op.like]: "%%",
              },
            },
          },
        ],
        attributes: ["id"],
        limit: 8,
      });

      const blogsIds = blogs.map((blog) => blog.BlogId);

      const result = await blog.findAll({
        where: {
          id: {
            [Op.in]: blogsIds,
          },
        },
        include: [
          {
            model: user,
            attributes: ["id", "username"],
          },
          {
            model: category,
            attributes: ["id", "name"],
          },
          {
            model: keyword,
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).send("success");
    } catch (err) {
      res.status(400).send(err);
    }
  },
};

// storage code
