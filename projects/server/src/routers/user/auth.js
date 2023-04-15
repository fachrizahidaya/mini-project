const router = require("express").Router();
const { verifyToken } = require("../../middleware/verifyToken");
const { authUser } = require("../../controllers/index");
const {
  validationRegister,
  runValidation,
  validationLogin,
  validationEmail,
  validationReset,
  validationChange,
} = require("../../middleware/validation");

router.post("/register", validationRegister, runValidation, authUser.register);
router.post("/verify", verifyToken, authUser.verification);
router.post("/login", validationLogin, runValidation, authUser.login);
router.get("/keepLogin", authUser.keepLogin);
router.put(
  "/forgotPass",
  validationEmail,
  runValidation,
  authUser.forgotPassword
);
router.patch(
  "/resetPass",
  verifyToken,
  validationReset,
  runValidation,
  authUser.resetPassword
);
router.patch(
  "/changePass/:id",
  verifyToken,
  validationChange,
  runValidation,
  authUser.changePassword
);
router.post("/secondVer", authUser.secondVerification);

module.exports = router;
