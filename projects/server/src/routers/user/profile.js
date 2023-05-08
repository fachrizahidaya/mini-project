const router = require("express").Router();
const { profile } = require("../../controllers");
const { multerUpload } = require("../../middleware/multer");
const { verifyToken } = require("../../middleware/verifyToken");

router.post(
  "/single-uploaded",
  verifyToken,
  multerUpload.single("file"),
  profile.uploadPic
);

module.exports = router;
