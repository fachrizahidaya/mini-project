const router = require("express").Router();
const { catAdmin } = require("../../controllers/index");

router.post("/create", catAdmin.create);
router.get("/allCategory", catAdmin.findAll);

module.exports = router;
