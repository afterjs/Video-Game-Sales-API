const Sequelize = require('sequelize');
const database = require('../db');

const Plataforms = database.define('plataforms', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Plataforms;