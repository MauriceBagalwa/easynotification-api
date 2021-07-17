const mongoose = require('mongoose')
const Schema = mongoose.Schema

const submitMobile = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "Customers"
    },
    reseau: {
        type: String
    },
    reference: {
        type: String,
        uppercase: true
    },
    montant: {
        type: Number
    },
    devise: {
        type: String
    },
    etat: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('submits_mobile', submitMobile)