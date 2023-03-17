const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your first name'
            },
            notEmpty: {
                msg: 'Please enter your first name'
            }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your last name'
            },
            notEmpty: {
                msg: 'Please enter your last name'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your email'
            },
            notEmpty: {
                msg: 'Please enter your email'
            },
            isEmail: {
                msg: 'Please enter a valid email'
            }
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your password'
            },
            notEmpty: {
                msg: 'Please enter your password'
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your role'
            },
            notEmpty: {
                msg: 'Please enter your role'
            }
        }
    }
});

module.exports = User;