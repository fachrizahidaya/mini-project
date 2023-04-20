const router = require("express").Router();
const { verifyToken } = require("../../middleware/verifyToken");
const { authUser } = require("../../controllers");
const {
  validationRegister,
  runValidation,
  validationLogin,
  validationEmail,
  validationReset,
  validationChangePass,
  validationChangeEmail,
  validationChangeUsername,
  validationChangePhone,
} = require("../../middleware/validation");

router.post("/register", validationRegister, runValidation, authUser.register);
router.patch("/verify", verifyToken, authUser.verification);
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
  "/changePass",
  verifyToken,
  validationChangePass,
  runValidation,
  authUser.changePassword
);
router.post("/secondVer", authUser.secondVerification);
router.patch(
  "/changeEmail",
  verifyToken,
  validationChangeEmail,
  runValidation,
  authUser.changeEmail
);
router.patch(
  "/changeUsername",
  verifyToken,
  validationChangeUsername,
  runValidation,
  authUser.changeUsername
);
router.patch(
  "/changePhone",
  verifyToken,
  validationChangePhone,
  runValidation,
  authUser.changePhone
);

module.exports = router;
