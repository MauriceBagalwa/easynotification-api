const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        unique: [true, `${this.name} est déjà utilisé.`]
    },
    description: {
        type: String
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    }
    , etat: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Group = mongoose.model("Groups", groupSchema)
module.exports = Group;