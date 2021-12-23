const Sequelize = require('sequelize');
const database = require('../config/db');

const Roles = database.define('roles', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Roles;