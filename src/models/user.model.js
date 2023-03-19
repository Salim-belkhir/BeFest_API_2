module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    
    const User = sequelize.define('User', {
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

    return User;
};