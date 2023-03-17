const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');


const Creneau = sequelize.define('Creneau', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    heureDebut: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter a start time'
            },
            notEmpty: {
                msg: 'Please enter a start time'
            }
        }
    },
    heureFin: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter an end time'
            },
            notEmpty: {
                msg: 'Please enter an end time'
            }
        }
    }
});

module.exports = Creneau;