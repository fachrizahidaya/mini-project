'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saved_Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Saved_Blog.init({
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Saved_Blog',
  });
  return Saved_Blog;
};