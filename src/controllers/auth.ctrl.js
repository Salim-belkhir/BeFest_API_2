const db = require("../models");
const config = require("../configs/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.user;


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then( hash => {
        User.create({
            lastname : req.body.lastname,
            firstname : req.body.firstname,
            email : req.body.email,
            password : hash,
            role: req.body.role
        })
        .then(() => res.status(201).send("Utilisateur inscrit"))
        .catch(error => {
            console.log(error);
            res.status(400).json({error});
        });
    })
    .catch(error => res.status(500).json({error}));
};

exports.signin = (req, res) => {
    User.findAll({
        where: {
            email: req.body.email
        }
    })
    .then(userDB => {
        let user = userDB[0].dataValues;
        if (!user) {
            return res.status(401).json({message : "Mot de passe/login faux"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).send("Mot de passe erroné");
            }

            delete user.password;

            var token = jwt.sign(
                    {userId : user._id }, config.secret,
                    { expiresIn: '24h' }
            );

            user.token = token;

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};