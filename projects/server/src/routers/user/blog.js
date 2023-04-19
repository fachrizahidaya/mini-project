const router = require("express").Router();
const { blogUser } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");
const {
  validationBlog,
  runValidation,
} = require("../../middleware/validation");

router.post(
  "/create/:id",
  // validationBlog,
  // runValidation,
  multerUpload.single("file"),
  blogUser.create
);
router.post(
  "/like/:id",
  // /:idBlog"
  blogUser.like
);
router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  blogUser.uploadImg
);
router.get("/byId/:id", blogUser.findById);
router.get("/userLike/:UserId", blogUser.findUserLike);
router.get("/pagUser", blogUser.pagUser);
router.get("/pagLike", blogUser.pagLike);
router.get("/vidThumb/:id", blogUser.videoThumb);

module.exports = router;
