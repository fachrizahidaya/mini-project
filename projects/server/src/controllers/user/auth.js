const db = require("../../models");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const secretKey = process.env.TOKEN_SECRET_KEY;
const transporter = require("../../middleware/transporter");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const path = require("path");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, phone, password, confirmPassword, FE_URL } =
        req.body;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const data = await user.create({
        username,
        email,
        phone,
        password: hashPassword,
      });
      const payload = {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        id: data.id,
        isVerified: data.isVerified,
      };

      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      const tempEmail = fs.readFileSync(
        path.join(__dirname, "../../template/user.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        link: `${FE_URL || "http://localhost:3000"}/verification/${token}`,
      });
      await transporter.sendMail({
        from: "Purwadhika Team",
        to: email,
        subject: "Account Verification",
        html: tempResult,
      });

      res.status(200).send({
        message: "Please check your Email to verify your Account",
        data,
        token,
      });
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  verification: async (req, res) => {
    try {
      const isAccountExist = await user.findOne({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      await user.update(
        {
          isVerified: true,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).send({
        message: "Verification success",
      });
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  login: async (req, res) => {
    try {
      const { username, email, phone, password } = req.body;
      const isAccountExist = await user.findOne({
        where: {
          [Op.or]: {
            username: username || "",
            email: email || "",
            phone: phone || "",
          },
        },
      });

      if (!isAccountExist) throw "Acoount not found";
      if (!isAccountExist.isVerified) throw "Acoount not verify";

      const isValid = await bcrypt.compare(password, isAccountExist.password);
      if (!isValid) throw "Incorrect Password";

      const payload = {
        email: isAccountExist.email,
        id: isAccountExist.id,
      };
      const token = jwt.sign(payload, secretKey);
      res
        .status(200)
        .send({ message: "Welcome to Blog", isAccountExist, token });
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, secretKey);
      const result = await user.findOne({
        where: {
          email: verify.email,
          id: verify.id,
        },
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email, FE_URL } = req.body;
      const isAccountExist = await user.findOne({
        attributes: ["email"],
        where: {
          email: email,
        },
      });
      const payload = {
        email: isAccountExist.email,
        id: isAccountExist.id,
        isVerified: isAccountExist.isVerified,
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      const tempEmail = fs.readFileSync(
        path.join(__dirname, "../../template/reset.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email: isAccountExist.email,
        link1: `${FE_URL || "http://localhost:3000"}/reset-password/${token}`,
      });
      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Reset Password",
        html: tempResult,
      });
      res.status(200).send({
        message: "Please check your Email to reset password",
        data: token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;
      const isAccountExist = await user.findOne({
        where: {
          email: req.user.email,
        },
      });
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      await user.update(
        {
          password: hashPass,
        },
        {
          where: {
            email: req.user.email,
          },
        }
      );
      const tempEmail = fs.readFileSync(
        path.join(__dirname, "../../template/changePassword.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email: isAccountExist.email,
      });
      await transporter.sendMail({
        from: "Purwadhika Team",
        to: req.user.email,
        subject: "Password Change",
        html: tempResult,
      });
      res.status(200).send({
        message: "Please Login again",
        data: isAccountExist,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, password, confirmPassword } = req.body;
      const isAccountExist = await user.findOne({
        where: { id: req.user.id },
      });
      // if (isAccountExist.isVerified === 0)
      //   throw `Account not verified, you are not allowed to change Email`;
      const isValid = await bcrypt.compare(
        currentPassword,
        isAccountExist.password
      );
      if (!isValid) throw `Incorrect Current Password`;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const data = await user.update(
        {
          password: hashPass,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      const tempEmail = fs.readFileSync(
        path.join(__dirname, "../../template/changePassword.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email: isAccountExist.email,
      });
      await transporter.sendMail({
        from: "Purwadhika Team",
        to: req.user.email,
        subject: "Password Change",
        html: tempResult,
      });
      res.status(200).send({
        message: "Please Login again",
        data: isAccountExist,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },

  secondVerification: async (req, res) => {
    try {
      const { email, FE_URL } = req.body;
      const response = await user.findOne({
        where: {
          email: email,
        },
      });

      if (response.isVerified === true) throw `Account is verified`;
      const payload = {
        id: response.id,
        email: response.email,
      };

      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      const tempEmail = fs.readFileSync(
        path.join(__dirname, "../../template/re-verify.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        link: `${FE_URL || "http://localhost:3000"}/verification/${token}`,
      });
      await transporter.sendMail({
        from: "Purwadhika Team",
        to: email,
        subject: "Account Verification",
        html: tempResult,
      });
      res.status(200).send({
        message: "Please check your Email to verify your Account",
        token,
      });
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  changeEmail: async (req, res) => {
    try {
      const { currentEmail, newEmail, FE_URL } = req.body;
      const isAccountExist = await user.findOne({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      // if (isAccountExist.isVerified === 0)
      //   throw `Account not verified, you are not allowed to change Email`;
      const data = await user.update(
        {
          email: newEmail,
          isVerified: false,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      const payload = {
        email: isAccountExist.email,
        id: isAccountExist.id,
        isVerified: isAccountExist.isVerified,
      };
      const token = jwt.sign(payload, secretKey, {
        expiresIn: "1h",
      });
      const tempEmail = fs.readFileSync(
        path.join(__dirname, "../../template/re-verify.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        link: `${
          FE_URL || "http://localhost:3000"
        }/verification-change-email/${token}`,
      });
      await transporter.sendMail({
        from: "Purwadhika Team",
        to: newEmail,
        subject: "Change Email Verification",
        html: tempResult,
      });
      res.status(200).send({
        message: "Please check your Email to verify your Account",
        data,
        token,
      });
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  changeUsername: async (req, res) => {
    try {
      const { currentUsername, newUsername, FE_URL } = req.body;
      const isAccountExist = await user.findOne({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      // if (isAccountExist.isVerified === 0)
      //   throw `Account not verified, you are not allowed to change Username`;
      const data = await user.update(
        {
          username: newUsername,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      const tempEmail = fs.readFileSync(
        path.join(__dirname, "../../template/changeUsername.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email: isAccountExist.email,
      });
      await transporter.sendMail({
        from: "Purwadhika Team",
        to: req.user.email,
        subject: "Username Change",
        html: tempResult,
      });
      res.status(200).send({
        message: "Username changed",
      });
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  changePhone: async (req, res) => {
    try {
      const { currentPhone, newPhone, FE_URL } = req.body;
      const isAccountExist = await user.findOne({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      // if (isAccountExist.isVerified === 0)
      //   throw `Account not verified, you are not allowed to change Email`;
      const data = await user.update(
        {
          phone: newPhone,
          isVerified: false,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      const payload = {
        email: isAccountExist.email,
        id: isAccountExist.id,
        isVerified: isAccountExist.isVerified,
      };
      const token = jwt.sign(payload, secretKey, {
        expiresIn: "1h",
      });
      const tempEmail = fs.readFileSync(
        path.join(__dirname, "../../template/re-verify.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        link: `${
          FE_URL || "http://localhost:3000"
        }/verification-change-email/${token}`,
      });
      await transporter.sendMail({
        from: "Purwadhika Team",
        to: isAccountExist.email,
        subject: "Change Phone Number Verification",
        html: tempResult,
      });
      res.status(200).send({
        message: "Please check your Email to verify your Account",
        data,
      });
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },

  // controllers for express-validator
  existingEmail: async (email) => {
    const emailUser = await user.findOne({
      where: {
        email,
      },
    });
    if (!emailUser) {
      return false;
    }
    return true;
  },

  existingUsername: async (username) => {
    const data = await user.findOne({
      where: {
        username,
      },
    });
    if (!data) {
      return false;
    }
    return true;
  },

  existingPhone: async (phone) => {
    const data = await user.findOne({
      where: {
        phone,
      },
    });
    if (!data) {
      return false;
    }
    return true;
  },

  existingAccount: async (usernamePhoneEmail) => {
    const data = await user.findOne({
      where: {
        [Op.or]: {
          username: usernamePhoneEmail,
          email: usernamePhoneEmail,
          phone: usernamePhoneEmail,
        },
      },
    });
    if (!data) {
      return true;
    }
    return false;
  },

  existingPassword: async (password) => {
    const data = await user.findOne({
      where: {
        password,
      },
    });
    if (!data) {
      return false;
    }
    return true;
  },

  registeredEmail: async (email) => {
    const data = await user.findOne({
      where: {
        email,
      },
    });
    if (!data) {
      return true;
    }
    return false;
  },

  registeredUsername: async (username) => {
    const data = await user.findOne({
      where: {
        username,
      },
    });
    if (!data) {
      return true;
    }
    return false;
  },

  registeredPhone: async (phone) => {
    const data = await user.findOne({
      where: {
        phone,
      },
    });
    if (!data) {
      return true;
    }
    return false;
  },
};
