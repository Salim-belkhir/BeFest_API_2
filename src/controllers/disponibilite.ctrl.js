const db = require('../models');
const Disponibilite = db.disponibilite;
const Creneau = db.creneau
const Jour = db.jour

exports.getAllDisponibiliteOfUser = (req, res) => {
    Disponibilite.findAll({
        attributes: [],
        include: [{
            model: 'Creneau',
            attributes: [],
            include: [{
                model: Jour,
                where: {
                    festival_jour : req.params.idFestival
                },
            }]
            
        }],
        where: {
            user_dispo: req.params.idUser
        }
    })
    /*
    Creneau.findAll({
        attributes: [],
        include: [{
            model: 'Disponibilite',
            where: {user_dispo: req.params.idUser}
        },
        {
            model: 'Jour',
            where: {festival_jour: req.params.idFestival}
        }]
    })*/
    .then(disponibilites => {
        // Je souhaite renvoyer que crenau_dispo et heure_debut et heure_fin
        // Je souhaite récupérer l'id du jour et le nom du jour
        const result = disponibilites.map(dispo => {
            return {
                id: dispo.id,
                creneau_dispo: dispo.creneau_dispo,
                heure_debut: dispo.Creneau.heureDebut,
                heure_fin: dispo.Creneau.heureFin,
                jour: dispo.Creneau.Jour.name
            }
        })
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving disponibilites."
        });
    });
}


exports.getAllDisponibiliteOfCreneau = (req, res) => {
    Disponibilite.findAll({
        where: {
            creneau_dispo: req.params.id
        },
        include: ['User']
    })
    .then(disponibilites => {
        res.status(200).send(disponibilites);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving disponibilites."
        });
    });
}



exports.createDisponibilite = (req, res) => {
    const disponibilite = {
        user_dispo: req.body.user_dispo,
        creneau_dispo: req.body.creneau_dispo
    }

    Disponibilite.create(disponibilite)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the disponibilite."
        });
    });
}



exports.updateDisponibilite = (req, res) => {
    if (!req.body.user_dispo || !req.body.creneau_dispo) {
        res.status(400).send({
            message: "There are some informations necessary not provided!"
        });
        return;
    }

    const disponibilite = {
        user_dispo: req.body.user_dispo,
        creneau_dispo: req.body.creneau_dispo
    };

    Disponibilite.update(disponibilite, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.status(201).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the disponibilite."
        });
    });
}



exports.deleteDisponibilite = (req, res) => {
    Disponibilite.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the disponibilite."
        });
    });
}
