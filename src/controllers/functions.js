const model = require('../schema/functions')

module.exports = {
    functions: async (req, res, next) => {
        await model.find(function (err, result) {
            if (err) next(err);
            res.status(200).json(result)
        }).sort({ _id: -1 })
    },
    function: async (req, res, next) => {
        const value = new model(req.body)
        await value.save(function (err, result) {
            if (err) next(err);
            next()
        })
    },
    update: async (req, res, next) => {
        const { _id } = req.body
        delete req.body._id
        await model.findOneAndUpdate({ _id }, req.body, { new: true },
            function (err, result) {
                if (err) next(err)
                res.status(200).json(result)
            })
    },
    delete: async (req, res, next) => {
        const { _id } = req.body
        await model.findOneAndDelete({ _id }, function (err, result) {
            if (err) next(err)
            if (result)
                res.status(200).json({ result: "Deleted Function." });
            else
                res.status(200).json({ result: "Function not Fount." });
        })
    },

}