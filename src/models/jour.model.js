module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;

    const Jour = sequelize.define('Jour', {
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
        heureOuverture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter an opening time'
                },
                notEmpty: {
                    msg: 'Please enter an opening time'
                }
            }
        },
        heureFermeture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a closing time'
                },
                notEmpty: {
                    msg: 'Please enter a closing time'
                }
            }
        }
    });

    return Jour;
};