const router = require("express").Router();
const { blog } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");
const { multerBlogUpload } = require("../../middleware/multerBlog");
const {
  validationBlog,
  runValidation,
} = require("../../middleware/validation");
const { verifyToken } = require("../../middleware/verifyToken");

router.post(
  "/create",
  verifyToken,
  // validationBlog,
  // runValidation,
  multerBlogUpload.single("file"),
  blog.create
);
router.post(
  "/like",
  // /:idBlog"
  verifyToken,
  blog.like
);
// router.post(
//   "/single-uploaded",
//   multerUpload.single("file"),
//   blog.uploadImg
// );
router.post("/category", blog.createCategory);
router.post("/key", blog.createKey);
router.patch("/remove/:id", blog.remove);
router.patch("/update/:id", blog.update);
router.get("/byId/:id", blog.findById);
router.get("/byUser", verifyToken, blog.findUserLike);
router.get("/pagBlog", blog.pagBlog);
router.get("/pagUser", blog.pagUser);
router.get("/pagLike", blog.pagLike);
router.get("/pagFav", blog.pagFavorite);
router.get("/vidThumb/:id", blog.videoThumb);
router.get("/allBlog", blog.allBlog);
router.get("/allCategory", blog.allCategory);
// router.get("/allCategory", blog.findAll);
router.delete("/unlike/:idBlog", verifyToken, blog.unlike);

module.exports = router;
