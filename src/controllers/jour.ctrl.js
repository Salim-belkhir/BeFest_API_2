const db = require("../models");
const Jour = db.jour;
const Creneau = db.creneau;
const Affectation = db.affectation;
const User = db.user;




exports.getAllJoursOfFestival = (req, res) => {
    Jour.findAll({
        attributes: ['id', 'name', 'heureOuverture', 'heureFermeture', [db.Sequelize.fn('COUNT', db.Sequelize.fn('DISTINCT', db.Sequelize.col('Creneaus->Affectations->User.email'))), 'countBenevoles']],
        where: {
            festival_jour: req.params.id
        },
        include: [{
            model: Creneau,
            include: [{
                model: Affectation,
                include: [{
                    model: User
                }]
            }]
        }],
        group: ['Jour.id'],
    }).then(jours => {
        console.log(jours)
        res.status(200).send(jours);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving jours."
        });
    });
};

// Récupere les jours d'un festival tel que il existe une affectation pour un bénévole donné
exports.getAllJoursOfFestivalForUser = (req, res) => {
    Jour.findAll({
      attributes: ['id', 'name', 'heureOuverture', 'heureFermeture', [db.Sequelize.fn('COUNT', db.Sequelize.fn('DISTINCT', db.Sequelize.col('Creneaus->Affectations->User.email'))), 'countBenevoles']],
      where: {
        festival_jour: req.params.idFest
      },
      include: [{
        model: Creneau,
        include: [{
          model: Affectation,
          where: {
            user_affectation: req.params.idUser
          },
            include: [{
                model: User
            }]
        }]
      }],
      group: ['Jour.id'],
    })
    .then(jours => {
      // enelever les jours qui n'ont pas d'affectation pour le user dans le creneau
        for (let i = 0; i < jours.length; i++) {
            if (jours[i].dataValues.Creneaus.length == 0) {
                jours.splice(i, 1);
                i--;
            }
        }
      res.status(200).send(jours);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving jours."
      });
    });
  };





exports.createJour = (req, res) => {
    console.log(req.body)
    const jour = {
        name : req.body.name,
        festival_jour : req.body.id_festival,
        heureOuverture : req.body.heureOuverture,
        heureFermeture : req.body.heureFermeture
    };
    Jour.create(jour)
        .then(jour => {
            res.status(201).send(jour);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Jour."
            });
        });
};


exports.updateJour = (req, res) => {
    const new_jour = {
        name : req.body.name,
        heureOuverture : req.body.heureOuverture,
        heureFermeture : req.body.heureFermeture
    }
    Jour.update(new_jour, {
        where: {
            id: req.params.id
        }
    })
        .then(jour => {
            res.status(200).send(Boolean(jour));
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: err.message || "Some error occurred while updating the Jour."
            });
        }
    );
};


exports.deleteJour = (req, res) => {
    Jour.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.status(200).send({
            message: "Jour deleted successfully!"
        });
    })       
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Jour."
        });
    });
};