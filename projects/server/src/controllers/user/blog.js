const db = require("../../models");
const blog = db.Blog;
const blogCategory = db.Blog_Category;


module.exports = {
  create: async (req, res) => {
    try {
      const { title, content, country, CategoryId } = req.body;
      const result = await blog.create({
        title,
        content,
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
          ProductId: item.id,
        });
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  
};
