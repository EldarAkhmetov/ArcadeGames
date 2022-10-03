'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    games: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    cage1: DataTypes.INTEGER,
    cage2: DataTypes.INTEGER,
    cage3: DataTypes.INTEGER,
    cage4: DataTypes.INTEGER,
    fifteenRecord: DataTypes.INTEGER,
    fifteenGames: DataTypes.INTEGER,
    fifteenMedium: DataTypes.INTEGER,
    mineEasy: DataTypes.INTEGER,
    mineNormal: DataTypes.INTEGER,
    mineHard: DataTypes.INTEGER,
    mineEasyWin: DataTypes.INTEGER,
    mineNormalWin: DataTypes.INTEGER,
    mineHardWin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};