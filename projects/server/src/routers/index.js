// user
const authUser = require("./user/auth");
const profileUser = require("./user/profile");
const blogUser = require("./user/blog");
// admin
const authAdmin = require("./admin/auth");
const catAdmin = require("./admin/category");
const blogAdmin = require("./admin/blog");

module.exports = {
  authUser,
  profileUser,
  blogUser,
  authAdmin,
  catAdmin,
  blogAdmin,
};
