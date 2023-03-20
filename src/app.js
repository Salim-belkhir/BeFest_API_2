const express = require('express');
const db = require("./models");

// Routes
const affectationRoute = require('./routes/affectation.route');
const festivalRoute = require('./routes/festival.route');
const userRoute = require('./routes/user.route');
const zoneRoute = require('./routes/zone.route');
const authRoute = require('./routes/auth.route');
const jourRoute = require('./routes/jour.route');


const app = express();



db.sequelize.sync()
  .then(() => {
    console.log("Synced to database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  })
;


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());

app.use('/api/affectations', affectationRoute);
app.use('/api/festivals', festivalRoute);
app.use('/api/users', userRoute);
app.use('/api/zones', zoneRoute);
app.use('/api/auth', authRoute);
app.use('/api/jours', jourRoute);



module.exports = app;