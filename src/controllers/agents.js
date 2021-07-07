const model = require('../schema/agent')
module.exports = {
    agents: async (req, res, next) => {
        await model.find(function (err, result) {
            if (err) next(err);
            res.status(200).json({ result })
        }).populate({ path: 'function' }).sort({ _id: -1 })
    },
    agent: async (req, res, next) => {
        const value = new model(req.body)
        await value.save(function (err, result) {
            if (err) next(err);
            next()
        })
    },
    update: async (req, res, next) => {
        const _id = req.body._id;
        delete req.body._id
        await model.findOneAndUpdate({ _id }, req.body, { new: true }, function (err, docs) {
            if (err) next(err);
            res.status(200).json(docs)
        })
    },
    delete: async (req, res, next) => {
        const _id = req.body._id;
        await model.findOneAndDelete({ _id }, function (err, docs) {
            if (err) next(err);
            else
                res.status(200).json({
                    result: 'Agent deleted succefull'
                })
        })
    }
}