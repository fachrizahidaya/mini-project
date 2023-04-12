const router = require("express").Router();
const { blogUser } = require("../../controllers/index");

router.post("/create", blogUser.create);

module.exports = router;
