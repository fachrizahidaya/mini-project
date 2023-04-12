const router = require("express").Router();
const { blogUser } = require("../../controllers/index");

router.post("/create/:id", blogUser.create);
router.post("/like/:id/:idBlog", blogUser.like);

module.exports = router;
