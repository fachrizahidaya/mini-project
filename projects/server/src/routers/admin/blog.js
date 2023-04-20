const router = require("express").Router();
const { blogAdmin } = require("../../controllers/index");

router.post("/createKey", blogAdmin.createKey);
router.get("/allBlog", blogAdmin.allBlog);
router.get("/allCategory", blogAdmin.allCategory);
router.get("/pagBlog", blogAdmin.pagBlog);

module.exports = router;
