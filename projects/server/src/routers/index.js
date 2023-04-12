// user
const authUser = require("./user/auth");
const profileUser = require("./user/profile");
const blogUser = require("./user/blog");
// admin
const authAdmin = require("./admin/auth");
const catAdmin = require("./admin/category");

module.exports = {
  authUser,
  profileUser,
  blogUser,
  authAdmin,
  catAdmin,
};
