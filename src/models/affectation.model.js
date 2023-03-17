const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Affectation = sequelize.define('Affectation', {});

module.exports = Affectation;