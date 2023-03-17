const dbConfig = require("../configs/db.configs.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.festival = require("./festival.model.js") (sequelize, Sequelize);
db.zone = require("./zone.model.js")(sequelize, Sequelize);
db.creneau = require("./creneau.model.js")(sequelize, Sequelize);
db.affectation = require("./affectation.model.js")(sequelize, Sequelize);
db.disponibilite = require("./disponibilite.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.jour = require("./jour.model.js")(sequelize, Sequelize);


db.festival.hasMany(db.jour, {foreignKey: {name: 'festival_jour', type: Sequelize.INTEGER}});
db.jour.belongsTo(db.festival, {foreignKey: {name: 'festival_jour', type: Sequelize.INTEGER}}); 

db.festival.hasMany(db.zone, {foreignKey: {name: 'festival_zone', type: Sequelize.INTEGER}});
db.zone.belongsTo(db.festival, {foreignKey: {name: 'festival_zone', type: Sequelize.INTEGER}});

db.user.hasMany(db.disponibilite, {foreignKey: {name: 'user_dispo', type: Sequelize.INTEGER}});
db.disponibilite.belongsTo(db.user, {foreignKey: {name: 'user_dispo', type: Sequelize.INTEGER}});
db.creneau.hasMany(db.disponibilite, {foreignKey: {name: 'creneau_dispo', type: Sequelize.INTEGER}});
db.disponibilite.belongsTo(db.creneau, {foreignKey: {name: 'creneau_dispo', type: Sequelize.INTEGER}});


db.user.hasMany(db.affectation, {foreignKey: {name: 'user_affectation', type: Sequelize.INTEGER}});
db.affectation.belongsTo(db.user, {foreignKey: {name: 'user_affectation', type: Sequelize.INTEGER}});
db.zone.hasMany(db.affectation, {foreignKey: {name: 'zone_affectation', type: Sequelize.INTEGER}});
db.affectation.belongsTo(db.zone, {foreignKey: {name: 'zone_affectation', type: Sequelize.INTEGER}});
db.creneau.hasMany(db.affectation, {foreignKey: {name: 'creneau_affectation', type: Sequelize.INTEGER}});
db.affectation.belongsTo(db.creneau, {foreignKey: {name: 'creneau_affectation', type: Sequelize.INTEGER}});


db.jour.hasMany(db.creneau, {foreignKey: {name: 'jour_creneau', type: Sequelize.INTEGER}});
db.creneau.belongsTo(db.jour, {foreignKey: {name: 'jour_creneau', type: Sequelize.INTEGER}});


db.ROLES = ["admin", "benevole"]


module.exports = db;