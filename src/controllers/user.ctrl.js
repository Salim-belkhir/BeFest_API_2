const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs');


exports.getUserById = (req, res) => {
    if(req.params.id != req.userId) {
        res.status(403).send({
            message: "Forbidden, it's not your account."
        });
        return;
    }

    User.findAll({
        where: {
            id: req.params.id
        },
        attributes: { exclude : ['password'] }
    })
    .then(user => {
        res.status(200).send(user);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        });
        console.log(err)
    });
};



exports.updateUser = (req, res) => {
    if(req.params.id != req.userId) {
        res.status(403).send({
            message: "Forbidden, it's not your account."
        });
        return;
    }

    if(req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
    }

    delete req.body.id; 

    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "User was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating User with id=" + id
        });
    });
}


exports.getAllBenevoles = (req, res) => {
    User.findAll({
        where: {
            role: "benevole"
        },
        attributes: { exclude : ['password'] }
    })
    .then(users => {
        res.status(200).send(users);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};