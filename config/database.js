const Sequelize = require("sequelize");
const config = require("./config");

const postGresConfg = {
  dialect: config.pg.dialect,
  host: config.pg.hostname,
  port: config.pg.port,
  database: config.pg.database,
  username: config.pg.username,
  password: config.pg.password,
  logging: false,
};


const sequelize = new Sequelize(postGresConfg);

module.exports = sequelize;
