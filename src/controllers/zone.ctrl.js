const { Sequelize } = require("../models");
const db = require("../models");
const Zone = db.zone;
const Affectation = db.affectation;



exports.getAllZonesOfFestival = (req, res) => {
    Zone.findAll({
        where: {
            festival_zone: req.params.id
        }
    })
    .then(zones => {
        res.status(200).send(zones);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving zones."
        });
        console.log(err)
    });
}


exports.getAllZonesOfCreneau = (req, res) => {
    Zone.findAll({
        attribute: ['id', 'name', 'nbBenevolesNeeded', [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('Affectations->User.email'))), 'countBenevoles']],
        include: [{
            model: Affectation,
            where: { creneau_affectation: req.params.id },
        }],
        group: ['Zone.id'],
    })
    .then(zones => {
        res.status(200).send(zones);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving zones."
        });
        console.log(err)
    });
}



exports.createZone = (req, res) => {
    const zone = {
        name: req.body.name,
        festival_zone: req.body.festival_zone,
        nbBenevolesNeeded: req.body.nbBenevolesNeeded,
    };

    Zone.create(zone)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Zone."
        });
    });
}



exports.updateZone = (req, res) => {
    const new_zone = {
        name: req.body.name,
        festival_zone: req.body.festival_zone,
        nbBenevolesNeeded: req.body.nbBenevolesNeeded,
    };

    Zone.update(new_zone, {
        where: {
            id: req.params.id
            }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Zone was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Zone with id=${id}. Maybe Zone was not found!`
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Error updating Zone with id=" + id
            });
        }
    );
}


exports.deleteZone = (req, res) => {
    Zone.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Zone was deleted successfully!"
            });
        } else {
            res.status(404).send({
                message: `Cannot delete Zone with id=${id}. Maybe Zone was not found!`
            });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            message: "Could not delete Zone with id=" + id
        });
    });
}