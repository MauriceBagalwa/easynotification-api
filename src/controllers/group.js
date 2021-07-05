const { findOneAndUpdate } = require('../schema/group')
const db = require('../schema/group')
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
module.exports = {
    //Affichage du group
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
    group: async (req, res, next) => {
        const { name, description } = req.body
        const newGroup = new db({
            name: name,
            description: description,
        })
        await newGroup.save(function (err, group) {
            if (err) next(err)
            else
                next()
        })
    },
    update: async (req, res, next) => {
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
                    res.send({
                        status: 200,
                        result
                    })
        })
    },
    delete: async (req, res, next) => {
        await db.deleteOne({ _id: req.body._id }, function (err, del) {
            if (err) next(err)
            else
                if (del == null)
                    res.send({
                        status: 404,
                        result: "Group not Found."
                    })
                else
                    res.send({
                        status: 404,
                        result: "Group Delete."
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
            if (err) next(err)
            else
                if (result == null)
                    res.send({
                        status: 404,
                        result: "Group not Found."
                    })
                else {
                    res.send({
                        status: 200,
                        result
                    })
                }
        })
    }
}