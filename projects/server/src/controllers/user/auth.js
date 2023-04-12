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
      const { username, email, phone, password, confirmPassword } = req.body;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const data = await user.create({
        username,
        email,
        phone,
        password: hashPassword,
      });

      const token = jwt.sign({ email: email }, secretKey, { expiresIn: "1h" });
      const tempEmail = fs.readFileSync("./src/template/email.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        link: `http://localhost:3000/verification/${token}`,
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
      res.status(400).send(err);
    }
  },

  verification: async (req, res) => {
    try {
      const isAccountExist = await user.findOne({
        where: {
          email: req.user.email,
        },
        raw: true,
      });
      await user.update(
        {
          isVerified: true,
        },
        {
          where: {
            email: req.user.email,
          },
        }
      );
      res.status(200).send({
        message: "Verification success",
        data: isAccountExist,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { usernamePhoneEmail, password, id } = req.body;
      const isAccountExist = await user.findOne({
        where: {
          [Op.or]: {
            username: usernamePhoneEmail ? usernamePhoneEmail : "",
            email: usernamePhoneEmail ? usernamePhoneEmail : "",
            phone: usernamePhoneEmail ? usernamePhoneEmail : "",
            id: id ? id : 0,
          },
        },
        raw: true,
      });
      const payload = {
        email: isAccountExist.email,
        id: isAccountExist.id,
        isVerified: isAccountExist.isVerified,
      };
      const token = jwt.sign(payload, secretKey);
      const isValid = await bcrypt.compare(password, isAccountExist.password);
      if (!isValid) throw "Incorrect Password";
      res
        .status(200)
        .send({ message: "Welcome to Blog", isAccountExist, token });
    } catch (err) {
      res.status(400).send(err);
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
      res.status(400).send(err);
    }
  },

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
};
