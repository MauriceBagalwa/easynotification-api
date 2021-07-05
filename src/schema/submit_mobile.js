const mongoose = require('mongoose')
const Schema = mongoose.Schema

const submitMobile = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId
    },
    reseau: {
        type: String
    },
    reference: {
        type: String
    },
    montant: {
        type: Number
    },
    devise: {
        type: String
    },
    etat: {
        type: Number,
        default: -1
    }
})

module.exports = mongoose.model('submits_mobile', submitMobile)