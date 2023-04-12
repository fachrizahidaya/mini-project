const router = require("express").Router();
const { verifyToken } = require("../../middleware/verifyToken");
const { authUser } = require("../../controllers/index");
const {
  validationRegister,
  runValidation,
} = require("../../middleware/validation");

router.post("/register", validationRegister, runValidation, authUser.register);
router.post("/verify", verifyToken, authUser.verification);
router.post("/login", authUser.login);
router.get("/keepLogin", authUser.keepLogin);

module.exports = router;
