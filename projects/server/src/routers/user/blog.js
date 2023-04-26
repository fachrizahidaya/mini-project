const router = require("express").Router();
const { blogUser } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");
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
  multerUpload.single("file"),
  blogUser.create
);
router.post(
  "/like",
  // /:idBlog"
  verifyToken,
  blogUser.like
);
router.post(
  "/single-uploaded",
  multerUpload.single("file"),
  blogUser.uploadImg
);
router.patch("/remove/:id", blogUser.remove);
router.patch("/update/:id", blogUser.update);
router.get("/byId/:id", blogUser.findById);
router.get("/userLike", verifyToken, blogUser.findUserLike);
router.get("/pagUser", blogUser.pagUser);
router.get("/pagLike", blogUser.pagLike);
router.get("/pagFav", blogUser.pagFavorite);
router.get("/vidThumb/:id", blogUser.videoThumb);
router.delete("/unlike/:idBlog", verifyToken, blogUser.unlike);
  
module.exports = router;
