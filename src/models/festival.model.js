module.exports = (sequelize, Sequelize) => {
    const Festival = sequelize.define("Festival", {
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

    return Festival;

}