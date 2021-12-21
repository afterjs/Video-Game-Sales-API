const Sequelize = require('sequelize');
const database = require('../db');

const Games = database.define('games', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Games;