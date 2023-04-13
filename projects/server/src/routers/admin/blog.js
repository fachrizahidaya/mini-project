const router = require("express").Router();
const { blogAdmin } = require("../../controllers/index");

router.get("/allBlog", blogAdmin.allBlog);
router.get("/allCategory", blogAdmin.allCategory);
router.get("/pagBlog", blogAdmin.pagBlog);

module.exports = router;
