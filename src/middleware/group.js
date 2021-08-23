const db = require('../schema/group')

module.exports = {
    groups: async (req, res, next) => {
        await db.find(function (err, result) {
            if (err) next(err)
            else
                res.send({
                    status: 200,
                    result
                })
        }).sort({ createdAt: -1 })
    },
    isExist: async (req, res, next) => {
        const { _id, name, description, entreprise } = req.body
        console.log(req.body)
        const filter = {
            $and: [{ $or: [{ name }, { description }] }, { entreprise },
            { _id: { $ne: _id } }]
        }

        await db.findOne(filter, function (err, exist) {
            if (err) next(err)
            else
                if (exist)
                    res.status(401).json({
                        status: 401,
                        result: "Group or description already exist."
                    })
                else
                    next()
        })
    }
}