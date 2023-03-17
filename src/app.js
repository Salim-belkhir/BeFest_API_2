const express = require('express');
const db = require("./models");


const app = express();



db.sequelize.sync()
  .then(() => {
    console.log("Synced to database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });


module.exports = app;