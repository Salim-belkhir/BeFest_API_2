const db = require("../models");
const Affectation = db.affectation;



exports.getAllAffectation = (req, res) => {
    Affectation.findAll({
        include: ['User', 'Zone', 'Creneau']
    })
    .then(affectations => {
        res.status(200).send(affectations);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving affectations."
        });
    });
};


exports.getAllAffectationOfFestival = (req, res) => {
    Affectation.findAll({
        where: {
            festival_affectation: req.params.id
        },
        include: ['User', 'Zone', 'Creneau']
    })
    .then(affectations => {
        res.status(200).send(affectations);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving affectations."
        });
    });
}


exports.getAllAffectationOfUser = (req, res) => {
    Affectation.findAll({
        where: {
            user_affectation: req.params.id
        },
        include: ['Zone', 'Creneau']
    })
    .then(affectations => {
        res.status(200).send(affectations);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving affectations."
        });
    });
};


exports.getAllAffectationOfCreneau = (req, res) => {
    Affectation.findAll({
        where: {
            creneau_affectation: req.params.id
        },
        include: ['User', 'Zone']
    })
    .then(affectations => {
        res.status(200).send(affectations);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving affectations."
        });
    });
};


exports.getAllAffectationOfZoneForCreneau = (req, res) => {
    Affectation.findAll({
        where: {
            zone_affectation: req.params.id_zone,
            creneau_affectation: req.params.id_creneau
        },
        include: ['User']
    })
    .then(affectations => {
        res.status(200).send(affectations);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving affectations."
        });
    });
};




exports.deleteAffectation = (req, res) => {
    Affectation.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.status(200).send({
            message: "Affectation deleted successfully!"
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Affectation."
        });
    });
}


exports.createAffectation = (req, res) => {
    if (!req.body.id_user || !req.body.id_zone || !req.body.id_xcreneau) {
        res.status(400).send({
            message: "There are some informations necessary not provided!"
        });
        return;
    }

    const affectation = {
        user_affectation: req.body.id_user,
        zone_affectation: req.body.id_zone,
        creneau_affectation: req.body.id_creneau
    };

    Affectation.create(affectation)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Affectation."
        });
    });
}


exports.updateAffectation = (req, res) => {
    if (!req.body.user_affectation || !req.body.zone_affectation || !req.body.creneau_affectation) {
        res.status(400).send({
            message: "There are some informations necessary not provided!"
        });
        return;
    }

    const affectation = {
        user_affectation: req.body.id_user,
        zone_affectation: req.body.id_zone,
        creneau_affectation: req.body.id_creneau
    };

    Affectation.update(affectation, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.status(201).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the Affectation."
        });
    });
}


exports.deleteAffectation = (req, res) => {
    Affectation.destroy({
        where: {
            id: req.params.id,
            user_affectation: req.userId
        }
    })
    .then(() => {
        res.status(200).send({
            message: "Affectation deleted successfully!"
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Affectation."
        });
    });
}