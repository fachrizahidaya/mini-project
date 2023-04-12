// user
const authUser = require("../controllers/user/auth");
const profileUser = require("../controllers/user/profile");
const blogUser = require("../controllers/user/blog");
// admin
const authAdmin = require("../controllers/admin/auth");
const catAdmin = require("../controllers/admin/category");

module.exports = {
  authUser,
  profileUser,
  blogUser,
  authAdmin,
  catAdmin,
};
