const db = require('../models');
const Creneau = db.creneau;
const Affectation = db.affectation;
const User = db.user;


exports.getAllCreneauOfJour = (req, res) => {
    Creneau.findAll({
        attributes: ['id', 'heureDebut', 'heureFin', [db.Sequelize.fn('COUNT', db.Sequelize.fn('DISTINCT', db.Sequelize.col('Affectations->User.email'))), 'countBenevoles']],
        where: {
            jour_creneau: req.params.id
        },
        include: [{
            model: Affectation,
            include: [{
                model: User
            }]
        }],
        group: ['Creneau.id'],
    })
    .then(creneaux => {
        res.status(200).send(creneaux);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving creneaux."
        });
    });
};

// Récupérer que les creneaux qui ont une affectation pour un user donné
exports.getAllCreneauOfJourForUser = (req, res) => {
    Creneau.findAll({
        attributes: ['id', 'heureDebut', 'heureFin', [db.Sequelize.fn('COUNT', db.Sequelize.fn('DISTINCT', db.Sequelize.col('Affectations->User.email'))), 'countBenevoles']],
        where: {
            jour_creneau: req.params.idJour
        },
        include: [{
            model: Affectation,
            where: {
                user_affectation: req.params.idUser
            },
            include: [{
                model: User
            }]
        }],
        group: ['Creneau.id'],
    })
    .then(creneaux => {
        console.log(creneaux.length)
        res.status(200).send(creneaux);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving creneaux."
        });
    });
};


exports.createCreneau = (req, res) => {
    const creneau = {
        heureDebut : req.body.heureDebut,
        heureFin : req.body.heureFin,
        jour_creneau : req.body.jour_creneau
    };

    Creneau.create(creneau)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the creneau."
        });
    });
};



exports.deleteCreneau = (req, res) => {
    Creneau.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Creneau was updated successfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot update Creneau with id=${id}. Maybe Creneau was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the creneau."
        });
    });
};


exports.updateCreneau = (req, res) => {
    const creneau = {
        heureDebut : req.body.heureDebut,
        heureFin : req.body.heureFin,
        jour_creneau : req.body.jour_creneau
    };

    Creneau.update(creneau, {
        where: {
            id: req.params.id
        }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Creneau was updated successfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot update Creneau with id=${id}. Maybe Creneau was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the creneau."
        });
    });
};