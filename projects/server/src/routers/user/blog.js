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
router.patch("/remove/:id", blogUser.remove);
router.patch("/update/:id", blogUser.update);
router.get("/byId/:id", blogUser.findById);
router.get("/userLike/:UserId", blogUser.findUserLike);
router.get("/pagUser", blogUser.pagUser);
router.get("/pagLike", blogUser.pagLike);
router.get("/vidThumb/:id", blogUser.videoThumb);
router.delete("/unlike/:id/:idBlog", blogUser.unlike);

module.exports = router;
