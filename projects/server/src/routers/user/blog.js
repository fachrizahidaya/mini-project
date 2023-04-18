const router = require("express").Router();
const { blogUser } = require("../../controllers/index");
const {
  validationBlog,
  runValidation,
} = require("../../middleware/validation");

router.post("/create/:id", validationBlog, runValidation, blogUser.create);
router.post(
  "/like/:id",
  // /:idBlog"
  blogUser.like
);
router.get("/byId/:id", blogUser.findById);
router.get("/userLike/:UserId", blogUser.findUserLike);
router.get("/pagUser", blogUser.pagUser);
router.get("/pagLike", blogUser.pagLike);

module.exports = router;
