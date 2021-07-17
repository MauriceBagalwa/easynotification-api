const model = require('../schema/subscription')
module.exports = {
    subscriptions: async function (req, res, next) {
        const { subscriber, skip, limit } = req.query
        const lt = skip - 1;

        model.find({ subscriber, etat: false }, function (err, find) {
            if (err) next(err)
            if (find)
                res.status(200).json({ find })
            else
                res.status(502).json({ find: 'nothing to load.' })
        }).populate({ path: 'agent' }).sort({ _id: -1 })
            .skip(lt).limit(parseInt(100))
    },
    subscription: async function (req, res, next) {
        const value = new model(req.body)
        await value.save(function (err, result) {
            if (err) next(err);
            else
                req.body = {
                    email: req.body.email,
                    code: result.code
                }
            next()
        })
    },
    rechargeCompte: async function (req, res, next) {
        const { subscriber, code } = req.body
        console.log(req.body)
        await model.findOneAndUpdate({ etat: false, subscriber, code }, { etat: true }, function (err, docs) {
            console.log(docs)
            if (err) next(err);
            if (docs) {
                req.body = {
                    _id: subscriber,
                    qte: docs.subscriber.sms += docs.qte
                }
                next()
                // res.status(200).json({ docs: docs.subscriber, newreq })
            }
            else

                res.status(501).json({
                    result: 'code invalid.'
                })

        }).populate({ path: 'subscriber' })
    }
}