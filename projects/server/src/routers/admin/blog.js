const router = require("express").Router();
const { blogAdmin } = require("../../controllers/index");

router.get("/allCategory", blogAdmin.allBlog);

module.exports = router;
