const jwt = require('jsonwebtoken');
const config = require("../configs/auth.config.js");
const db = require("../models");
const User = db.user;

/** Authentification **/
// 1) Auth allows to verify the token and extract the token from the request header.
//    The token is then decoded and the userId is extracted from the token
// 2) We can know if the user is an admin or not


exports.verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }
        const decodedToken = jwt.verify(token, config.secret);
        req.userId = decodedToken.userId;
        next();
    }
    catch(error){
        res.status(401).json({error});
    }
};



exports.isAdmin = (req, res, next) => {
  User.findAll({
    where: {
        id: req.userId
    }
  })
    .then((user) => {
        if(!user) return res.status(404).send({ message: "User doesn't exist." });
        if(user.role !== 'admin') return res.status(403).send({ message: "Require Admin Role!" });
        next();
    })
    .catch((error) => {
        res.status(500).send(error);
    });
};