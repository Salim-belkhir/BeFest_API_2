const db = require('../models');
const Creneau = db.creneau;


exports.getAllCreneauOfJour = (req, res) => {
    Creneau.findAll({
        where: {
            jour_creneau: req.params.id
        }
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
    .then(data => {
        res.status(200).send(data);
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
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the creneau."
        });
    });
};