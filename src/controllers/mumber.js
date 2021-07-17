const db = require('../schema/member')
module.exports = {
    member: async (req, res, next) => {
        const value = new db({
            fullname: req.body.fullname,
            indice: req.body.indice,
            number: req.body.number,
        })
        await value.save(function (err, result) {
            if (err) next()
            else
                next()
        })
    },
    members: async (req, res, next) => {
        await db.find(function (err, result) {
            if (err) next(err)
            else
                res.send({
                    status: 200,
                    result
                })
        })

    }, update: async (req, res, next) => {
        const filter = {
            _id: req.body._id
        }
        delete req.body._id
        await db.findOneAndUpdate(filter, req.body, { new: true }, function (err, result) {
            if (err) next(err)
            else
                if (result != null)
                    res.send({
                        status: 200,
                        result
                    })
                else
                    res.send({
                        status: 404,
                        result: 'Member not Found.'
                    })
        })
    }, delete: async (req, res, next) => {
        await db.findByIdAndDelete({ _id: req.body._id }, function (err, result) {
            if (err) next(err)
            else
                if (result != null)
                    res.send({
                        status: 200,
                        result: ""
                    })
                else
                    res.send({
                        status: 404,
                        result: 'Member not Found.'
                    })
        })
    },
}