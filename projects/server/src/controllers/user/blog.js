const { Op, Sequelize } = require("sequelize");
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
      const { title, content, CategoryId, url, keywords, country } = JSON.parse(
        req.body.data
      );
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
            country: country,
          },
          {
            transaction: t,
          }
        );

        await Promise.all(
          keywords.split("  ").map(async (item) => {
            const [KeywordId, created] = await keyword.findOrCreate({
              where: {
                name: item,
              },
              transaction: t,
            });

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
      res.status(500).send({ success: false, err });
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
      res.status(500).send({ success: false, err });
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
      res.status(500).send({ success: false, err });
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
          "createdAt",
        ],
        include: [
          { model: category, attributes: ["name"] },
          { model: user, attributes: ["username", "imgProfile"] },
          {
            model: blogKeyword,
            include: [{ model: keyword }],
          },
        ],
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  findByIdAuth: async (req, res) => {
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
          "createdAt",
        ],
        include: [
          { model: category, attributes: ["name"] },
          { model: user, attributes: ["username", "imgProfile"] },
          {
            model: like,
            where: {
              UserId: req.user.id,
            },
            required: false,
          },
          {
            model: blogKeyword,
            include: [{ model: keyword }],
          },
        ],
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ success: false, err });
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
      res.status(500).send({ success: false, err });
    }
  },

  pagUser: async (req, res) => {
    try {
      const { id_cat, search, sort, size, page } = req.query;
      const cat1 = id_cat || "";
      const sort1 = sort || "DESC";
      const page1 = parseInt(page) || 1;
      const size1 = parseInt(size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;

      const result = await blog.findAll({
        where: {
          [Op.and]: [
            {
              UserId: req.user.id,
            },
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
        include: [
          {
            model: category,
            attributes: ["name"],
          },
          {
            model: user,
            attributes: ["username", "imgProfile"],
          },
        ],
        order: [["createdAt", `${sort1}`]],
        limit: size1,
        offset: start,
      });
      const totalRows = await blog.count({
        where: {
          [Op.and]: [
            {
              UserId: req.user.id,
            },
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
      res.status(500).send({ success: false, err });
    }
  },

  pagLike: async (req, res) => {
    try {
      const { id_cat, idUser, search, sort, page, size } = req.query;
      const cat1 = id_cat || "";
      const sort1 = sort || "DESC";
      const page1 = parseInt(page) || 1;
      const size1 = parseInt(size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;
      const condition = page1 * start;
      const result = await like.findAll({
        // attributes: ["id"],
        where: {
          UserId: req.user.id,
        },
        include: [
          {
            model: blog,
            attributes: ["title", "content"],
            where: {
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
      res.status(500).send({ success: false, err });
      res.status(400).send(err);
    }
  },

  pagFavorite: async (req, res) => {
    try {
      const { id_cat, search, sort, size, id_key, page } = req.query;
      const cat1 = id_cat || "";
      const sort1 = sort || "DESC";
      const page1 = parseInt(page) || 1;
      const size1 = parseInt(size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;

      const likes = await like.findAll();
      const result = await blog.findAll({
        include: [
          {
            model: like,

            attributes: ["id", "BlogId", "UserId"],
            required: false,
            include: [
              {
                model: user,
                attributes: ["username"],
                required: false,
              },
            ],
          },
          {
            model: category,
            attributes: ["name"],
            required: false,
          },
        ],
        attributes: [
          "id",
          [Sequelize.fn("count", Sequelize.col("likes.BlogId")), "total_fav"],
          "title",
        ],
        where: {
          [Op.and]: [
            [
              {
                CategoryId: {
                  [Op.like]: "%%",
                },
              },
              {
                title: {
                  [Op.like]: "%%",
                },
              },
              {
                isDeleted: false,
              },
            ],
          ],
        },
        group: ["id"],
        order: [[Sequelize.literal("total_fav"), `${sort1}`]],
        limit: size1,
        offset: start,
        subQuery: false,
        required: false,
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
      res.status(500).send({ success: false, err });
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
      res.status(500).send({ success: false, err });
    }
  },

  unlike: async (req, res) => {
    try {
      const data = await like.destroy({
        where: {
          UserId: req.user.id,
          BlogId: req.params.idBlog,
        },
      });
      res.status(200).send("Successfully deleted");
    } catch (err) {
      res.status(500).send({ success: false, err });
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
      res.status(500).send({ success: false, err });
    }
  },

  allCategory: async (req, res) => {
    try {
      const data = await category.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  pagFavorite: async (req, res) => {
    try {
      const { id_cat, search, sort, size, id_key, page, orderBy } = req.query;
      const cat1 = id_cat || "";
      const orderBy1 = orderBy || "id";
      const sort1 = sort || "DESC";
      const page1 = parseInt(page) || 1;
      const size1 = parseInt(size) || 8;
      const search1 = search || "";
      const start = (page1 - 1) * size1;

      const likes = await like.findAll();
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
          ],
        },
        include: [
          {
            model: user,
            attributes: ["username", "imgProfile"],
          },
          {
            model: category,
            attributes: ["id", "name"],
          },
          {
            model: blogKeyword,
            include: [
              {
                model: keyword,
                where: {
                  // name: {
                  //   [Op.like]: `%${search1}%`,
                  // },
                },
                required: false,
              },
            ],
            required: false,
          },
          {
            model: like,
            attributes: ["id", "BlogId"],
            include: [
              {
                model: user,
                attributes: ["username"],
                required: false,
              },
            ],
          },
        ],
        attributes: {
          include: [
            [Sequelize.fn("count", Sequelize.col("Likes.BlogId")), "total_fav"],
          ],
          exclude: ["UserId"],
        },
        group: ["id"],
        order: [[Sequelize.literal(orderBy1), `${sort1}`]],
        limit: size1,
        offset: start,
        subQuery: false,
        required: false,
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
      res.status(500).send({ success: false, err });
    }
  },

  pagBlog: async (req, res) => {
    try {
      const { id_cat, search, sort, size, page, sortBy } = req.query;
      const cat1 = id_cat || "";
      const sort1 = sort || "DESC";
      const sort2 = sortBy || "createdAt";
      const page1 = parseInt(page) || 1;
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
          ],
        },
        order: [[`${sort2}`, `${sort1}`]],
        limit: size1,
        offset: start,
        include: [
          {
            model: user,
            attributes: ["username", "imgProfile"],
          },
          {
            model: category,
            attributes: ["id", "name"],
          },
          {
            model: blogKeyword,
            include: [
              {
                model: keyword,
                where: {
                  // name: {
                  //   [Op.like]: `%${search1}%`,
                  // },
                },
                required: false,
              },
            ],
            required: false,
          },
        ],
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
      res.status(500).send({ success: false, err });
    }
  },

  pagBlogLogin: async (req, res) => {
    try {
      const { id_cat, search, sort, size, page, sortBy } = req.query;
      const cat1 = id_cat;
      const sort1 = sort || "DESC";
      const sort2 = sortBy || "createdAt";
      const page1 = parseInt(page) + 1 || 1;
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
          ],
        },

        order: [[`${sort2}`, `${sort1}`]],
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
            include: [
              {
                model: keyword,
                where: {
                  name: {
                    [Op.like]: `%${search}%`,
                  },
                },
              },
            ],
          },
        ],
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
      res.status(500).send({ success: false, err });
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
      res.status(500).send({ success: false, err });
    }
  },

  findAll: async (req, res) => {
    try {
      const data = await category.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },
};
