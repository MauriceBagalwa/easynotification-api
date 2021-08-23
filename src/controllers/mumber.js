const db = require('../schema/mumber')
const { Added } = require('../services/added')

const wantTo = new Added('mumbers')
module.exports = {
    mumber: async (req, res, next) => {
        const value = new db(req.body)
        await value.save(function (err, result) {
            if (err) next(err);
            else {
                req.query = req.body.entreprise
                next()
            }
        })
    },
    members: async (req, res, next) => {
        const { entreprise } = req.query
        console.log(req.query)
        await db.find(entreprise, function (err, result) {
            if (err) next(err);
            res.send({
                status: 200,
                result
            })
        }).sort({ createdAt: -1 }).populate({
            path: 'groups',
            select: 'name description'
        })

    }, update: async (req, res, next) => {
        const filter = {
            _id: req.body._id
        }
        delete req.body._id
        console.log(req.body)
        await db.findOneAndUpdate(filter, req.body, { new: true }, function (err, result) {
            if (err) next(err);
            else
                if (result)
                    res.status(200).json({
                        result
                    });
                else {
                    res.status(404).json({
                        result: 'Member not Found.'
                    })
                }
        }).sort({ createdAt: -1 }).populate({
            path: 'groups',
            select: 'name description'
        })
    }, delete: async (req, res, next) => {
        await db.findByIdAndDelete({ _id: req.body._id }, function (err, result) {
            if (err) next(err);
            if (result)
                res.status(200).json({
                    result: 'Mumbre deleted.'
                });
            res.status(200).json({
                result: 'Mumbre not Found.'

            });
        })
    },
    deleteGroup: async (req, res, next) => {
        const { group } = req.query._id;

        await db.updateMany({}, { $pull: { groups: group } },
            function (err, docs) {
                if (err) next();
                res.status(200).json({ result: `${group} delete succeful.` })
            })
    },
    // New 
    _mumber: async function (req, res, next) {
        res.json(await wantTo.add(db, req.body))

    }
}