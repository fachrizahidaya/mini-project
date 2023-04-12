const db = require("../../models");
const blog = db.Blog;
const blogCategory = db.Blog_Category;
const user = db.User;
const like = db.Like;

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

      const data = await blog.findAll({
        where: {
          id: result.id,
        },
      });

      data.map(async (item) => {
        await blogCategory.create({
          CategoryId,
          BlogId: item.id,
        });
      });
      res.status(200).send("Success Added");
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
      const data = await blog.findOne({
        idBlog: req.params.id,
      });

      const result = await like.create({
        UserId: response.id,
        BlogId: data.id,
      });
      res.status(200).send("Like added");
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
