const Sequelize = require("sequelize");
const database = require("../config/database");

const Log = database.define("logs", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  remoteAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  method: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  usernameId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = Log;
