const Sequelize = require('sequelize');
const database = require('../db');


const Info = database.define('perms_roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    label: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = Info;