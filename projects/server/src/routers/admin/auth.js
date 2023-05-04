const router = require("express").Router();
const { checkRole } = require("../../middleware/checkRole");
const { authAdmin } = require("../../controllers");
const { verifyToken } = require("../../middleware/verifyToken");



module.exports = router;
