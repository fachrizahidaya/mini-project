'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog_Category.belongsTo(models.Blog)
      Blog_Category.belongsTo(models.Category)
    }
  }
  Blog_Category.init({
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog_Category',
  });
  return Blog_Category;
};