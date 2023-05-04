const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../../models");
const db = require("../../models");
const blog = db.Blog;
const blogCategory = db.Blog_Category;
const user = db.User;
const like = db.Like;
const category = db.Category;
const blogKeyword = db.Blog_Keyword;
const keyword = db.Keyword;
const local = "youtube-thumbnail";
const youtubeThumbnail = require(local);

module.exports = {
  create: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);
      const { title, content, CategoryId, url, keywords } = req.body;
      // const key1 = parseInt(id_key);
      const allowedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      let fileUploaded = req.file;
      const response = await user.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (response.isVerified === false)
        throw `Account is not verified, please verify first`;

      // if (!req.file) throw "Picture is required";
      if (!allowedTypes.includes(req.file.mimetype))
        throw "Invalid file type. Only JPG, JPEG, WEBP and PNG are allowed.";

      if (req.file.size > 1 * 1024 * 1024) {
        return res
          .status(401)
          .send("File size exceeds the allowed limit of 1MB.");
      }
      if (!title) throw `Title must not be empty`;
      if (!content) throw `Content must not be empty`;
      if (!CategoryId) throw `Category must not be empty`;

      // id keyword yang mau masuk 5,6
      const t = await db.sequelize.transaction();
      try {
        var result = await blog.create(
          {
            title: title,
            content: content,
            UserId: req.user.id,
            CategoryId: CategoryId,
            imageURL: `Public/${fileUploaded?.filename}`,
            videoURL: url,
          },
          {
            transaction: t,
          }
        );

        await Promise.all(
          keywords.split(" ").map(async (item) => {
            const [KeywordId, created] = await keyword.findOrCreate({
              where: {
                name: item,
              },
              transaction: t,
            });
            if (created) {
              console.log(KeywordId.name);
            }
            await blogKeyword.create(
              {
                BlogId: result.id,
                KeywordId: KeywordId.dataValues.id,
              },
              {
                transaction: t,
              }
            );
          })
        );
        await t.commit();
      } catch (err) {
        await t.rollback();
      }
      res.status(200).send({
        message: "Success Added",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  uploadImg: async (req, res) => {
    try {
      const allowedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      let fileUploaded = req.file;
      if (!req.file) throw "Picture is required";
      if (!allowedTypes.includes(req.file.mimetype))
        throw "Invalid file type. Only JPG, JPEG, WEBP and PNG are allowed.";
      await blog.update(
        {
          imageURL: `Public/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      if (req.file.size > 1 * 1024 * 1024) {
        return res
          .status(401)
          .send("File size exceeds the allowed limit of 1MB.");
      }
      const getImg = await blog.findOne({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getImg.id,
        image: getImg.imageURL,
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
          id: req.user.id,
        },
      });
      if (response.isVerified === false)
        throw `Account is not verified, please verify first`;
      // const data = await blog.findOne({
      //   idBlog: req.params.id,
      // });
      // console.log(data.id);

      const data = await like.findOne({
        where: {
          UserId: response.id,
          BlogId,
        },
      });
      if (data) throw `Blog already liked`;

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
          UserId: req.user.id,
        },
      });
      res.status(200).send(data);
    } catch (err) {
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
    }
  },

  pagFavorite: async (req, res) => {
    try {
      const { id_cat, search, sort } = req.query;
      const cat1 = id_cat;
      const sort1 = sort || "DESC";
      const page1 = parseInt(req.query.page) + 1 || 1;
      const size1 = parseInt(req.query.size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;
      const condition = page1 * start;
      const result = await like.findAll({
        attributes: [
          "BlogId",
          [Sequelize.fn("count", Sequelize.col("BlogId")), "total_fav"],
          [Sequelize.literal("Blog.title"), "title"],
          "UserId",
          // [Sequelize.literal("Category.id"), "id"],
          // [Sequelize.literal("Category.name"), "category_name"],
        ],
        include: [
          {
            model: blog,
            attributes: [],
            where: {
              title: { [Op.like]: `%${search1}%` },
              CategoryId: { [Op.like]: `%${cat1}%` },
            },
            include: [
              {
                model: category,
                attributes: ["name"],
              },
            ],
          },
          {
            model: user,
            attributes: ["username"],
          },
        ],
        group: ["BlogId"],
        order: [[Sequelize.literal("total_fav"), `${sort1}`]],
        limit: 8,
        offset: 0,
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
    }
  },

  videoThumb: async (req, res) => {
    try {
      const response = await blog.findOne({
        attributes: ["id", "videoURL"],
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      let thumbnail = youtubeThumbnail(response.videoURL);
      let thumbVid = thumbnail.default.url;
      res.status(200).send({ response, data: thumbVid });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  remove: async (req, res) => {
    try {
      const data = await blog.update(
        {
          isDeleted: true,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Successfully deleted");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  unlike: async (req, res) => {
    try {
      const data = await like.destroy({
        where: {
          UserId: req.params.id,
          BlogId: req.params.idBlog,
        },
      });
      res.status(200).send("Successfully deleted");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { title, content, videoURL, country } = req.body;
      await blog.update(
        {
          title,
          content,
          videoURL,
          country,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      const edit = await blog.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(edit);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  allBlog: async (req, res) => {
    try {
      const data = await blog.findAll(
        {
          order: [["createdAt", "DESC", "UserId", "CategoryId"]],
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

  createCategory: async (req, res) => {
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
