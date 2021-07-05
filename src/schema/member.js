const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const memberSchema = new Schema({
    fullname: {
        type: String,
        unique: true
    },
    indice: {
        type: String
    },
    number: {
        type: Number,
        unique: true
    },
    activ: {
        type: Boolean,
        default: true
    }
})

const Mumber = mongoose.model('Mumbers', memberSchema)
module.exports = Mumber