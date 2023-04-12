const db = require("../../models");
const blog = db.Blog;
const blogCategory = db.Blog_Category;
const category = db.Category;

module.exports = {
  allBlog: async (req, res) => {
    try {
      const data = await blog.findAll({
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
};
