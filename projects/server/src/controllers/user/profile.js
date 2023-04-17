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
      //   const errors = validationResult(req);
      //   if (!errors.isEmpty()) {
      //     const err = new Error("Input values not match");
      //     err.errorStatus = 400;
      //     err.data = errors.array();
      //     throw err;
      //   }
      //   if (!req.file) {
      //     const err = new Error("Image must be uploaded");
      //     err.errorStatus = 422;
      //     err.data = errors.array();
      //     throw err;
      //   }
      //   const image = req.file.path;
    } catch (err) {
      res.status(400).send(err);
      console.log(err)
    }
  },
};
