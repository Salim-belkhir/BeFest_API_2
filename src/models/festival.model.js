const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');


const Festival = sequelize.define("festival", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.STRING,
        validate: {
            len: [4, 4]
        }
    },
    nbOfDays: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
        }
    },
    closed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Festival;