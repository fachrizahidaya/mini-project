const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Public"));
  },

  filename: (req, file, cb) => {
    cb(null, "Blog" + "-" + req.user.id + "." + file.mimetype.split("/")[1]);
  },
});

const fileFilter = (req, file, cb) => {
  try {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (err) {
    console.log(err);
  }
};

const maxSize = 1 * 1024 * 1024;

exports.multerBlogUpload = multer({
  storage: storage,
  //   fileFilter: fileFilter,
  //   limits: { fileSize: maxSize },
});
