const router = require("express").Router();
const { profileUser } = require("../../controllers");
const { multerUpload } = require("../../middleware/multer");

router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  profileUser.uploadPic
);

module.exports = router;
