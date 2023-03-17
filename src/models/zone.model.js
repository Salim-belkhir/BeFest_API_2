const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');


const Zone = sequelize.define('Zone', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter a name'
            },
            notEmpty: {
                msg: 'Please enter a name'
            }
        }
    },
    nbBenevolesNeeded: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter the number of volunteers needed'
            },
            notEmpty: {
                msg: 'Please enter the number of volunteers needed'
            },
            min: 0
        }
    },
});

module.exports = Zone;