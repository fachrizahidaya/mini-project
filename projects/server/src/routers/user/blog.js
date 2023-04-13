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
router.get("/userLike/:UserId", blogUser.userLike);

module.exports = router;
