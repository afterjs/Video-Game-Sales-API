const Sequelize = require("sequelize");
const database = require("../config/database");

const Log = database.define("logs", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  remoteaddress: {
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
  usernameid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = Log;
