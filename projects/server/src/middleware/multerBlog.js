const multer = require("multer");
const path = require("path");

// Masukin gambarnya za bikin multer baru ajh, di ubah nama filenya .. pake blog-{id} biar ga numpuk file.

// Jadi kmaren knpa di ganti ke avatar-id .. karna kalau ada user ganti foto baru .. di publicnya jadi ngeganti foto yang lama .. bukan nambahin, karena nama file nya sama .. avatar-1.jpg nah jadinya replace

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
