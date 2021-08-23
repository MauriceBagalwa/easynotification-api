const { collection } = require('../schema/customer');
const customer = require('../schema/customer')
const function_model = require('../schema/functions')
const agent_model = require('../schema/agent')
const submitMobile = require('../schema/submit_mobile')
var bcrypt = require('bcryptjs');

module.exports = {
    codevalidation: function (length) {
        return Math.floor(
            Math.pow(10, length - 1) +
            Math.random() * (Math.pow(10, length) -
                Math.pow(10, length - 1) - 1)
        );
    },
    // verifie si le client existe déjà ou pas
    // avant l'ajout
    customerExist: async (req, res, next) => {
        const { _id, name, rccm, email, signature } = req.body
        await customer.findOne({ $and: [{ $or: [{ name }, { rccm }, { email }, { signature }] }, { activated: true }, { _id: { $ne: _id } }] }, function (err, find) {
            if (err) next(err);
            if (find) {
                console.log(findByIdAndRemove)
                res.send({
                    status: 409,
                    result: "`Entrepriserccm`,`rccm`,`email`,`signature` l'un de ces donnée est déjà utliser.",
                });
            } else
                next()
        })

    },
    hashPassword: function (psswd) {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(psswd, salt);
    },
    // Funcion schema
    functionExist: async function (req, res, next) {
        const { _id, designation, description } = req.body
        await function_model.findOne({ $and: [{ $or: [{ designation }, { description }] }, { _id: { $ne: _id } }] }, function (err, find) {
            if (err) next(err);
            if (find)
                res.status(404).json({
                    result: 'Function already exist.'
                })
            else
                next()
        })
    },
    // Agent controller
    agentExist: async function (req, res, next) {
        const { _id, names, email, phone } = req.body
        console.log(req.body)
        await agent_model.findOne({ $and: [{ $or: [{ names }, { email }, { phone }] }, { _id: { $ne: _id } }] }, function (err, find) {
            if (err) next(err)
            if (find)
                res.status(404).json({
                    result: 'Agents already exist.',
                    find
                })
            else
                next()
        })
    },
    referenceIsUse: async function (req, res, next) {
        const { reference } = req.body
        await submitMobile.findOne({ reference }, function (err, find) {
            if (err) next(err);
            if (find)
                res.status(404).json({
                    result: 'But reference or Reference already use.',
                });
            else
                next()
        })
    }

}