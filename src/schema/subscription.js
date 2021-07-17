const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { codevalidation } = require('../utils/middleware')
const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    montant: {
        type: Number
    },
    devise: {
        type: String
    }, taux: {
        type: Number
    },
    qte: {
        type: Number
    },
    code: {
        type: String,
    },
    etat: {
        type: Boolean,
        default: false
    },
    agent: {
        type: Schema.Types.ObjectId,
        ref: 'Agents'
    }

}, { timestamps: true })
subscriptionSchema.pre('save', async function (err, next) {
    this.code = `RC-${codevalidation(6)}`
})

module.exports = mongoose.model('Subscriptions', subscriptionSchema)