const Sequelize = require("sequelize");
const database = require('../config/database');

const Genre = require("./genres");
const Platform = require("./platforms");
const Game = require("./games");

const Sales = database.define("sales", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  }
});

Sales.belongsTo(Genre, {
  constrain: true,
  foreignKey: "genreid",
});
Sales.belongsTo(Platform, {
  constrain: true,
  foreignKey: "platformid",
});
Sales.belongsTo(Game, {
  constrain: true,
  foreignKey: "gameid",
});

module.exports = Sales;
