module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes

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

    return Creneau;
};