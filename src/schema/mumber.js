const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
    fullname: {
        type: String,
        lowercase: true,
        max: [25, 'le nombre de caractere supperieure.'],
        unique: true
    },
    indice: {
        type: String
    },
    number: {
        type: Number,
        unique: [true, `le numéro ${this.number} est déjà utilisé`]
    },
    genre: {
        type: String,
        enum: { values: ['masculin', 'feminin'], message: `{this.genre} is not supported` },
    },
    entreprise: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    groups:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Groups',
            }
        ],
    etat: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Mumbers', memberSchema)
