"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User);
      Blog.hasMany(models.Blog_Keyword);
      // Blog.hasMany(models.Blog_Category);
      Blog.hasMany(models.Like);
      Blog.belongsTo(models.Category)
    }
  }
  Blog.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageURL: DataTypes.STRING,
      content: DataTypes.STRING,
      videoURL: DataTypes.STRING,
      country: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return Blog;
};
