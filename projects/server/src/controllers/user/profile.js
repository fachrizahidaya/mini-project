const { validationResult } = require("express-validator");
const db = require("../../models");
const user = db.User;

module.exports = {
  uploadPic: async (req, res) => {
    try {
      const allowedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      let fileUploaded = req.file;
      if (!req.file) throw "Picture is required";
      if (!allowedTypes.includes(req.file.mimetype))
        throw "Invalid file type. Only JPG, JPEG, WEBP and PNG are allowed.";
      if (req.file.size > 1 * 1024 * 1024) {
        return res
          .status(401)
          .send("File size exceeds the allowed limit of 1MB.");
      }
      await user.update(
        {
          imgProfile: `Public/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      const getProfile = await user.findOne({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getProfile.id,
        imgProfile: getProfile.imgProfile,
      });
    } catch (err) {
      res.status(500).send({success : false, err});
    }
  },
};
