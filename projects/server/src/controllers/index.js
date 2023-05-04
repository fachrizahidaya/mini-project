// user
const auth = require("../controllers/user/auth");
const profile = require("../controllers/user/profile");
const blog = require("../controllers/user/blog");
// admin

module.exports = {
  auth,
  profile,
  blog,
};
