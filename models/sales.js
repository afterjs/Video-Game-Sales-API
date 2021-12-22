const Sequelize = require("sequelize");
const database = require("../db");

const Genre = require("./genres");
const Plataform = require("./plataforms");
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
  }
});

Sales.belongsTo(Genre, {
  constrain: true,
  foreignKey: "genreid",
});
Sales.belongsTo(Plataform, {
  constrain: true,
  foreignKey: "plataformid",
});
Sales.belongsTo(Game, {
  constrain: true,
  foreignKey: "gameid",
});

module.exports = Sales;
