const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    members:
        [{
            fullname: {
                type: String
            },
            indice: {
                type: String
            },
            number: {
                type: Number
            },
            concern: {
                type: Boolean,
                default: false
            }
        }]

})

const Group = mongoose.model("Groups", groupSchema)
module.exports = Group;