const Sequelize = require('sequelize');
const database = require('../config/database');

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
        unique: true,
    }
})

module.exports = Roles;