module.exports = {
    HOST: "mysql-japanaku.alwaysdata.net",
    USER: "japanaku_befest",
    PASSWORD: "befest1234",
    DB: "japanaku_befest",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};