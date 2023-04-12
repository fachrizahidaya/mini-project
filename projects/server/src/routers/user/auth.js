const router = require("express").Router();
const { verifyToken } = require("../../middleware/verifyToken");
const { authUser } = require("../../controllers/index");
const {
  validationRegister,
  runValidation,
  validationLogin,
} = require("../../middleware/validation");

router.post("/register", validationRegister, runValidation, authUser.register);
router.post("/verify", verifyToken, authUser.verification);
router.post(
  "/login",
  validationLogin, runValidation,
  authUser.login
);
router.get("/keepLogin", authUser.keepLogin);

module.exports = router;
