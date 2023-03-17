const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Disponibilite = sequelize.define('Disponibilite', {});

module.exports = Disponibilite;