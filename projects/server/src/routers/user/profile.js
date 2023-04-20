const router = require("express").Router();
const { profileUser } = require("../../controllers");
const { multerUpload } = require("../../middleware/multer");
const { verifyToken } = require("../../middleware/verifyToken");

router.post(
  "/single-uploaded",
  verifyToken,
  multerUpload.single("file"),
  profileUser.uploadPic
);

module.exports = router;
