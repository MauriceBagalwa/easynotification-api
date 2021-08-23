const db = require('../schema/group')
const mumber = require('../schema/mumber')
const { Added } = require('../services/added')
const wantTo = new Added('Groups')
/*
* #Functions de verifiaction
* #d'existance de membre
 */

const mumberExist = function (array, body) {
    return array.find(element => {
        if (body.indice == element.indice && body.number == element.number)
            return true;
        else if (body.fullname == element.fullname) {
            return true;
        } else
            return false
    });
}

const findAllMumber = async function (group) {
    return await mumber.find({ groups: group }).count()
}
module.exports = {
    //Affichage du group
    groups: async (req, res, next) => {
        console.log(req.query)
        try {
            const groupes = await db.find({ customer: req.query.customer }).sort({ createdAt: -1 })
            if (!groupes)
                res.status(403).json({
                    result: "someting went wrong."
                })
            else {

                const newData = groupes.map(async (n) => {
                    const a = await mumber.countDocuments({ groups: n._id })
                    // n[count] = a;
                })

                res.status(200).json({
                    result: groupes
                })

            }
        } catch (error) {
            next(error)
        }
    },
    group: async (req, res, next) => {

        const newGroup = new db(req.body)
        await newGroup.save(function (err, group) {
            if (err) next(err)
            else
                req.query.customer = req.body.customer
            next()
        })
    },
    update: async (req, res, next) => {
        console.log(req.body)
        const filter = {
            _id: req.body._id
        }
        delete req.body._id;
        await db.findOneAndUpdate(filter, req.body, { new: true }, function (err, result) {
            if (err) next(err)
            else
                if (result == null) {
                    res.send({
                        status: 404,
                        result: "Group not Found."
                    })
                }
                else
                    res.status(200).json(
                        result
                    )
        })
    },
    delete: async (req, res, next) => {
        console.log(req.query)
        await db.findByIdAndRemove({ _id: req.query._id }, function (err, del) {
            if (err) next(err);
            if (del)
                next();
            else
                res.status(501).json({
                    result: "Group not Found."
                })
        })
    },
    mumber: async (req, res, next) => {
        const { _id, member } = req.body;
        console.log(member)
        const filter = {
            _id: _id
        }
        await db.findOneAndUpdate(filter, { $push: { members: member } }, { new: true }, function (err, result) {
            if (err) next(err);
            if (result)
                next()
            else
                res.send({
                    status: 404,
                    result: "Group not Found."
                })
        })
    },
    //
    _group: async function (req, res, next) {
        return await res.json(wantTo.add(db, req.body, next))
    }
}