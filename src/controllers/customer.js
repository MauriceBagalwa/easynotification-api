// const { updateOne } = require("../schema/customer");
const model = require("../schema/customer");
const { sendEmail, nextMail } = require('../utils/email')
const { hashPassword } = require('../utils/middleware')
module.exports = {
    /*
      # afficher tous les clients.
      */
    customers: async (req, res, next) => {
        await model
            .find(function (err, result) {
                if (err) next(err);
                res.send({
                    status: 200,
                    result,
                });
            })
    },
    /*
      # Ajout d'un client.
      */
    customer: async (req, res, next) => {
        const values = new model(req.body);
        await values.save(async function (err, result) {
            if (err) next(err);
            res.status(200).json(result)
        })
    },
    /*
      # Verification du compte.
      */
    activeCustomer: async (req, res, next) => {
        const { _id, codeValidation } = req.body
        const filter = {
            _id,
            codeValidation
        }
        const update = {
            activated: true
        }

        await model.findOneAndUpdate(filter, update, { new: true }, async function (err, result) {
            console.log(result)
            if (result)
                res.send({
                    status: 200,
                    result,
                });
            else
                res.send({
                    status: 500,
                    result: 'le code de confirmation saisi est incorrect.',
                });
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    },
    /*
      # Modification des données du client.
      */
    update: async (req, res, next) => {
        const filter = {
            _id: req.body._id
        }
        delete req.body._id
        const values = {
            name: req.body.name,
            rccm: req.body.rccm,
            codePays: req.body.codePays,
            phone: req.body.phone,
            email: req.body.email,
            adresse: req.body.adresse,
            signature: req.body.signature
        }
        await model.updateOne(filter, values, { new: true }, async function (err, result) {
            if (err)
                next(err)
            else
                res.send({
                    status: 200,
                    result,
                });
        }).catch((err) => {
            next(err)
        })
    },
    changeEmail: async (req, res, next) => {
        const filter = {
            _id: req.body._id,
        }
        const update = {
            email: req.body.email
        }
        // console.log(req.body)
        await model.findOneAndUpdate(filter, update, { new: true }, async function (error, result) {
            if (error)
                next(error)
            else {
                console.log(result)
                if (result == null) {
                    res.send({
                        status: 500,
                        result: 'Entreprise no Found.',
                    });
                } else {
                    const req = {
                        to: update.email,
                        subject: "Confirme count",
                        text: `Votre code de confirmation est ${result.codeValidation}`,
                        html: `<body><b>Votre code de confirmation est ${result.codeValidation}</b></body>`
                    }
                    await nextMail(req, res, next)
                }
            }
        });
    },
    changePassword: async (req, res, next) => {
        const { _id, newPsswd } = req.query
        await model.findOneAndUpdate({ _id }, { password: hashPassword(newPsswd) }, function (err, find) {
            if (err) next(err);
            if (find)
                res.status(200).json({
                    find: "Password update succeful"
                })
        })
    },
    resendEmail: async (req, res, next) => {
        const filter = {
            _id: req.body._id,
        }
        await model.findOne(filter, async function (error, result) {
            if (error)
                next(error)
            else {
                console.log(result)
                if (result != null) {
                    const req = {
                        to: result.email,
                        subject: "Confirme count",
                        text: `Votre code de confirmation est ${result.codeValidation}`,
                        html: `<body><b>Votre code de confirmation est ${result.codeValidation}</b></body>`
                    }
                    await nextMail(req, res, next)
                } else {
                    res.send({
                        status: 500,
                        result: "Entreprise no Found.",
                    });
                }
            }
        });
    },
    signin: async (req, res, next) => {
        const { email, psswd } = req.query;
        console.log(req.query)
        await model.findOne({ email, activated: true }, function (err, customer) {
            if (err) next(error)
            // fetch user and test password verification
            if (customer)
                customer.comparePassword(psswd, function (err, isMatch) {
                    if (err) next(err)
                    if (!isMatch) {
                        res.send({
                            status: 500,
                            result: "Adresse mail ou mot de passe incorrect.",
                        });
                    }
                    else {
                        res.send({
                            status: 200,
                            result: customer,
                        });
                    }
                })
            else
                res.send({
                    status: 500,
                    result: "Adresse mail ou mot de passe incorrect.",
                });
        })
    },
    info: (req, res) => {
        console.log('Game Over')
        res.send({
            status: 200,
            result: "Mail send succefuly."
        })
    }, infoData: (req, res) => {
        res.status(200).json(result)
    }
};

