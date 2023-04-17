const { validationResult } = require("express-validator");
const db = require("../../models");
const user = db.User;

module.exports = {
  uploadPic: async (req, res) => {
    try {
      let fileUploaded = req.file;
      await user.update(
        {
          imgProfile: `Public/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getProfile = await user.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getProfile.id,
        imgProfile: getProfile.imgProfile,
      });
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  },
};
