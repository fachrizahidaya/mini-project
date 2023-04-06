'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog_Keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog_Keyword.belongsTo(models.Blog)
      Blog_Keyword.belongsTo(models.Keyword)
    }
  }
  Blog_Keyword.init({
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog_Keyword',
  });
  return Blog_Keyword;
};