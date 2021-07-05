const model = require('../schema/submit_mobile')

module.exports = {
    submits: async (req, res, next) => {
        await model.find(function (err, result) {
            if (err) next(err);
            else
                res.status(200).json(result)
        })
    },
    submit: async (req, res, next) => {
        const value = new model(req.body)
        await value.save(function (err, result) {
            if (err) next(err);
            else {
                req.body = result
                next()
            }
        })
    },
    delete: async (req, res, next) => {
        await model.findOneAndDelete({ _id: req.body._id }, function (err, result) {
            if (err) next(err);
            if (result)
                res.status(200).json({ result: "submit delted succefful." })
            else
                res.status(200).json({ result: "submit not Fount." })
        })
    }
}