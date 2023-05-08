const router = require("express").Router();
const { blog } = require("../../controllers/index");
const { multerBlogUpload } = require("../../middleware/multerBlog");
const {
  validationBlog,
  runValidation,
} = require("../../middleware/validation");
const { verifyToken } = require("../../middleware/verifyToken");

router.get("/", blog.pagBlog);
router.get("/auth", verifyToken, blog.pagBlogLogin);
router.post("/", verifyToken, multerBlogUpload.single("file"), blog.create);
router.post("/like", verifyToken, blog.like);
router.post("/category", blog.createCategory);
router.patch("/remove/:id", blog.remove);
router.patch("/update/:id", blog.update);
router.get("/byUser", verifyToken, blog.findUserLike);
router.get("/pagUser", verifyToken, blog.pagUser);
router.get("/pagLike", blog.pagLike);
router.get("/pagFav", blog.pagFavorite);
router.get("/allCategory", blog.allCategory);
router.get("/vidThumb/:id", blog.videoThumb);
router.delete("/unlike/:idBlog", verifyToken, blog.unlike);
router.get("/auth/:id", verifyToken, blog.findByIdAuth);
router.get("/:id", blog.findById);

module.exports = router;
