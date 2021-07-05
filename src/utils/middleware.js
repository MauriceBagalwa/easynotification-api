const { collection } = require('../schema/customer');
const customer = require('../schema/customer')

module.exports = {
    // verifie si le client existe déjà ou pas
    // avant l'ajout
    customerExist: async (req, res, next) => {
        const { _id, name, rccm, email, signature } = req.body

        const filter = (_id == null ? { $and: [{ $or: [{ name }, { rccm }, { email }, { signature }] }, { created: true }] } : { $and: [{ $or: [{ name }, { rccm }, { email }, { signature }] }, { created: true }], _id: { $ne: _id } });
        await customer.findOne(filter).then((find) => {
            if (find) {
                res.send({
                    status: 409,
                    result: "[`Entrepriserccm`,`rccm`,`email`,`signature`] l'un de ces donnée est déjà utliser.",
                });
            } else
                next()
        })

    }
}