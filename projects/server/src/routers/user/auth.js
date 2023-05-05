const router = require("express").Router();
const { verifyToken } = require("../../middleware/verifyToken");
const { auth } = require("../../controllers");
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

router.post("/", validationRegister, runValidation, auth.register);
router.patch("/verify", verifyToken, auth.verification);
router.post("/login", validationLogin, runValidation, auth.login);
router.get("/", auth.keepLogin);
router.put(
  "/forgotPass",
  validationEmail,
  runValidation,
  auth.forgotPassword
);
router.patch(
  "/resetPass",
  verifyToken,
  validationReset,
  runValidation,
  auth.resetPassword
);
router.patch(
  "/changePass",
  verifyToken,
  validationChangePass,
  runValidation,
  auth.changePassword
);
router.post("/secondVer", auth.secondVerification);
router.patch(
  "/changeEmail",
  verifyToken,
  validationChangeEmail,
  runValidation,
  auth.changeEmail
);
router.patch(
  "/changeUsername",
  verifyToken,
  validationChangeUsername,
  runValidation,
  auth.changeUsername
);
router.patch(
  "/changePhone",
  verifyToken,
  validationChangePhone,
  runValidation,
  auth.changePhone
);

module.exports = router;
