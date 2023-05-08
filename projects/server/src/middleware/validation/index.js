const { check, validationResult, oneOf } = require("express-validator");
const db = require("../../models");
const {
  existingEmail,
  existingUsername,
  existingAccount,
  existingPassword,
  registeredEmail,
  registeredUsername,
  registeredPhone,
  existingPhone,
} = require("../../controllers/user/auth");

exports.runValidation = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send(error.array()[0].msg);
  }
  next();
};

exports.validationRegister = [
  check("email", "Email must not empty")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email Must with @")
    .custom((value) =>
      existingEmail(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Email already in use");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    ),
  check("phone", "Phone Number must not empty")
    .notEmpty()
    .isLength({ min: 10, max: 12 })
    .withMessage("Phone number minimum 10 numbers and maximum 12 numbers"),
  check("username", "Username must not empty")
    .notEmpty()
    .custom((value) =>
      existingUsername(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Username already in use");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    )
    .isLength({ min: 5 })
    .withMessage("Username minimum 5 characters"),
  check("password", "Password must not empty")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password minimum 6 characters")
    .matches(/^.*(?=.*[a-zA-Z])(?=.*\d).*$/i)
    .withMessage(
      "Password must contain a capital character and a special character"
    ),
  check("confirmPassword", "Password Confirmation must not empty")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw "Password confirmation not matched with the password";
      }
      return true;
    }),
];

exports.validationLogin = [
  oneOf(
    [
      check('username').notEmpty().withMessage('username must not empty'),
      check('email').notEmpty().withMessage('email must not empty'),
      check('phone').notEmpty().withMessage('phone must not empty'),
    ]
  ),
  // check("usernamePhoneEmail", "Account must not empty")
  //   .notEmpty()
  //   .custom((value) =>
  //     existingAccount(value)
  //       .then((status) => {
  //         if (status) {
  //           return Promise.reject("Account not found or Incorrect Password");
  //         }
  //       })
  //       .catch((err) => {
  //         return Promise.reject(err);
  //       })
  //   ),
  check("password", "Password must not empty").notEmpty(),
  // .custom((value) =>
  //   existingPassword(value)
  //     .then((status) => {
  //       if (status) {
  //         return Promise.reject("Account not found or Wrong Password");
  //       }
  //     })
  //     .catch((err) => {
  //       return Promise.reject(err);
  //     })
  // ),
];

exports.validationBlog = [
  check("title", "Title must not empty").notEmpty(),
  check("content", "Content must not empty").notEmpty(),
];

exports.validationEmail = [
  check("email", "Email must not empty")
    .notEmpty()
    .custom((value) =>
      registeredEmail(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Account not found");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    ),
];

exports.validationReset = [
  check("password", "Password must not empty")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password minimum 6 characters")
    .matches(/^.*(?=.*[a-zA-Z])(?=.*\d).*$/i)
    .withMessage(
      "Password must contain a capital character and a special character"
    ),
  check("confirmPassword", "Password Confirmation must not empty")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw "Password confirmation not matched with the password";
      }
      return true;
    }),
];

exports.validationChangePass = [
  check("currentPassword", "Current Password must not empty").notEmpty(),
  check("password", "Password must not empty")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password minimum 6 characters")
    .matches(/^.*(?=.*[a-zA-Z])(?=.*\d).*$/i)
    .withMessage(
      "Password must contain a capital character and a special character"
    ),
  check("confirmPassword", "Password Confirmation must not empty")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw "Password confirmation not matched with the password";
      }
      return true;
    }),
];

exports.validationChangeEmail = [
  check("currentEmail", "Current Email must not empty")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email Must with @")
    .custom((value) =>
      registeredEmail(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Account not found");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    ),
  check("newEmail", "New Email must not empty")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email Must with @")
    .custom((value) =>
      existingEmail(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Email already in use");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    ),
];

exports.validationChangeUsername = [
  check("currentUsername", "Username must not empty")
    .notEmpty()
    .custom((value) =>
      registeredUsername(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Account not found");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    ),
  check("newUsername", "New Username must not empty")
    .notEmpty()
    .custom((value) =>
      existingUsername(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Username already in use");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    )
    .isLength({ min: 5 })
    .withMessage("Username minimum 5 characters"),
];

exports.validationChangePhone = [
  check("currentPhone", "Phone Number must not empty")
    .notEmpty()
    .isLength({ min: 10, max: 12 })
    .withMessage("Phone number minimum 10 numbers and maximum 12 numbers")
    .custom((value) =>
      registeredPhone(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Account not found");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    ),
  check("newPhone", "New Phone Number must not empty")
    .notEmpty()
    .custom((value) =>
      existingPhone(value)
        .then((status) => {
          if (status) {
            return Promise.reject("Phone Number already in use");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    )
    .isLength({ min: 10, max: 12 })
    .withMessage("Phone number minimum 10 numbers and maximum 12 numbers"),
];
