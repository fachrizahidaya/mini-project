const router = require("express").Router();
const checkRole = require("../../middleware/checkRole");
const verifyToken = require("../../middleware/verifyToken");
const { authAdmin } = require("../../controllers/index");

router.post("/register", authAdmin.register);
router.post("/verify", verifyToken, authAdmin.verification);
router.post("/login", checkRole, authAdmin.login);
router.get("/keepLogin", authAdmin.keepLogin);

module.exports = router;
