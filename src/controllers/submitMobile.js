const model = require('../schema/submit_mobile')

module.exports = {
    submits: async (req, res, next) => {
        const { subscriber } = req.query
        await model.find({ subscriber, etat: 1 }, async function (err, docs) {
            if (err) next(err);
            else {
                await model.find({ subscriber, etat: { $ne: 1 } }, {
                }, function (err, result) {
                    if (err) next(err);
                    else
                        res.status(200).json({ docs, result })
                }).sort({ _id: -1 })
            }

        }).sort({ _id: -1 }).limit(3)
    },
    submit_: async (req, res, next) => {
        const { subscriber } = req.query
        await model.find({ subscriber, etat: 1 }, function (err, result) {
            if (err) next(err);
            else
                res.status(200).json({ result })
        }).sort({ _id: -1 }).limit(3)
    },
    submit: async (req, res, next) => {
        const value = new model(req.body)
        await value.save(function (err, result) {
            if (err) next(err);
            req.query = result
            next()
        })
    },
    delete: async (req, res, next) => {
        console.log(req.query._id)
        await model.findOneAndDelete({ _id: req.query._id }, function (err, result) {
            if (err) next(err);
            if (result)
                res.status(200).json({ result: "submit delted succefful." });
            else
                res.status(200).json({ result: "submit not Fount." });
        })
    },
    active: async function (req, res, next) {
        const { _id, etat, qte, agent, taux } = req.body
        await model.findOneAndUpdate({ _id, etat: 0 }, { etat: 1 }, function (err, docs) {
            if (err) next(err);
            if (docs) {
                req.body =
                {
                    subscriber: docs.subscriber._id,
                    email: docs.subscriber.email,
                    montant: docs.montant,
                    devise: docs.devise,
                    taux: taux,
                    qte: qte,
                    agent: agent
                }
                next()
            }
            else
                res.status(200).json({ result: "submit not Fount." });
        }).populate({ path: 'subscriber' })
    }
    // list of days in fre

}