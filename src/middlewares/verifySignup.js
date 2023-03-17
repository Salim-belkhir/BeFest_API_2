const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;


checkDuplicateEmail = (req, res, next) => {
    User.findAll({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (user) {
            res.status(400).send("Failed! Email is already in use!");
            return;
        }
        next();
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err.message);
    });
};



checkRolesExisted = (req, res, next) => {
    if(req.body.role){
        if(!ROLES.includes(req.body.role)){
            res.status(400).send("Failed! Role does not exist = " + req.body.role);
            return;
        }
    }
    next();
};



const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted
};
  
module.exports = verifySignUp;