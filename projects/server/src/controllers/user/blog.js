const { Op } = require("sequelize");
const db = require("../../models");
const blog = db.Blog;
const blogCategory = db.Blog_Category;
const user = db.User;
const like = db.Like;
const category = db.Category;

module.exports = {
  create: async (req, res) => {
    try {
      const { title, content, country, CategoryId } = req.body;

      const response = await user.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (response.isVerified === false)
        throw `Account is not verified, please verify first`;
      const result = await blog.create({
        title,
        content,
        UserId: response.id,
        CategoryId,
      });
      res.status(200).send({
        message: "Success Added",
        data: result,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  like: async (req, res) => {
    try {
      const { UserId, BlogId } = req.body;
      const response = await user.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (response.isVerified === false)
        throw `Account is not verified, please verify first`;
      // const data = await blog.findOne({
      //   idBlog: req.params.id,
      // });
      // console.log(data.id);

      const result = await like.create({
        UserId: response.id,
        BlogId,
      });
      res.status(200).send("Like added");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findById: async (req, res) => {
    try {
      const data = await blog.findAll({
        attributes: [
          "id",
          "title",
          "content",
          "imageURL",
          "videoURL",
          "UserId",
          "CategoryId",
        ],
        include: [{ model: category, attributes: ["name"] }],
        where: {
          UserId: req.params.id,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findUserLike: async (req, res) => {
    try {
      const data = await like.findAll({
        order: [["createdAt", "DESC"]],
        include: [{ model: blog }],
        where: {
          UserId: req.params.UserId,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  pagUser: async (req, res) => {
    try {
      const { id_cat, idUser, search, sort } = req.query;
      const cat1 = id_cat;
      const sort1 = sort || "DESC";
      const page1 = parseInt(req.query.page) + 1 || 1;
      const size1 = parseInt(req.query.size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;
      const condition = page1 * start;
      const result = await blog.findAll({
        where: {
          [Op.and]: [
            {
              UserId: idUser,
            },
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
        attributes: ["id", "title", "content", "CategoryId", "UserId"],
        include: [
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
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  },

  pagLike: async (req, res) => {
    try {
      const { id_cat, idUser, search, sort } = req.query;
      const cat1 = id_cat;
      const sort1 = sort || "DESC";
      const page1 = parseInt(req.query.page) + 1 || 1;
      const size1 = parseInt(req.query.size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;
      const condition = page1 * start;
      const result = await like.findAll({
        attributes: ["id"],
        include: [
          {
            model: blog,
            attributes: ["title", "content"],
            where: {
              UserId: idUser,
              title: { [Op.like]: `%${search1}%` },
              CategoryId: { [Op.like]: `%${cat1}%` },
            },
            include: [
              {
                model: category,
              },
            ],
          },
        ],
        order: [["createdAt", `${sort1}`]],
        limit: size1,
        offset: start,
        raw: true,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
