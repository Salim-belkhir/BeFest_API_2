const db = require("../models");
const Festival = db.festival;
const Sequelize = db.Sequelize;
const Zone = db.zone;
const Affectation = db.affectation;
const User = db.user;
const Jour = db.jour;

exports.getAllFestivals = (req, res) => {
    Festival.findAll({
        attributes: ['id', 'name', 'year', 'nbOfDays', 'closed', [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('Zones->Affectations->User.email'))), 'countBenevoles']],
        include: [{
            model: Zone,
            include: [{
                model: Affectation,
                include: [{
                    model: User,
                    where: { role: 'benevole' },
                    attributes: [],
                }],
            attributes: [],
            }],
        attributes: [],
        }],
        group: ['Festival.id'],
    })
    .then(festivals => {
        res.status(200).send(festivals);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving festivals."
        });
    });
};


exports.createFestival = (req, res) => {
    if (!req.body.name || !req.body.year || !req.body.nbOfDays || req.body.nbOfDays < 1) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Cree une zone libre et l'ajoute à ce festival
    const zone = {
        name: 'Libre',
        festival_zone: 0,
        nbBenevolesNeeded: 1,
    };


    const festival = {
        name: req.body.name,
        year: req.body.year,
        nbOfDays: req.body.nbOfDays,
        closed: false
    };

    Festival.create(festival)
        .then(data => {
            zone.festival_zone = data.id;
            Zone.create(zone);
            // Créer les jours du festival 
            for (let i = 1; i <= data.nbOfDays; i++) {
                const jour = {
                    name: 'Jour ' + i,
                    festival_jour: data.id,
                    heureOuverture: '08:00',
                    heureFermeture: '22:00'
                };
                Jour.create(jour);
            }
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Festival."
            });
        });
}


exports.closeFestival = (req, res) => {
    const id = req.params.id;

    Festival.update({ closed: true }, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Festival was disabled successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot disable Festival with id=${id}. Maybe Festival was not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Festival with id=" + id
            });
            console.log(err);
        });
}



exports.updateFestival = (req, res) => {
    const id = req.params.id;
    delete req.body.id;
    delete req.body.closed;

    Festival.update({ ...req.body},
        {
            where: { id: id }
        }
    )
    .then(num => {
        if (num == 1) {
            res.status(201).send({
                message: "Festival was updated successfully."
            });
        }
        else {
            res.status(404).send({
                message: `Cannot update Festival with id=${id}. Maybe Festival was not found`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Festival with id=" + id
        });
    }
    );
}



exports.deleteFestival = (req, res) => {
    const id = req.params.id;

    Festival.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Festival was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Festival with id=${id}. Maybe Festival was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Festival with id=" + id
            });
        });
}