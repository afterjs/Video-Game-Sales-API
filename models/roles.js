const Sequelize = require('sequelize');
const database = require('../db');

const Roles = database.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Roles;