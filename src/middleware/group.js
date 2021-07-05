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
        })
    },
    isExist: async (req, res, next) => {
        const { name } = req.body
        await db.findOne({ name }, function (err, exist) {
            if (err) next(err)
            else
                if (exist) res.send({
                    status: 401,
                    result: "Group already exist."
                })
                else
                    next()
        })
    }
}