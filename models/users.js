const Sequelize = require('sequelize');
const database = require('../config/database');
const Roles = require('./roles')

const User = database.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

User.belongsTo(Roles, {
    constrain: true,
    foreignKey: 'rolesid'
})
module.exports = User;