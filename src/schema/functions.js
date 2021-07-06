const mongoose = require('mongoose')
const Schema = mongoose.Schema

const functionSchema = new Schema({
    designation: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        lowercase: true
    }
}, { timetamps: true })

module.exports = mongoose.model('functions', functionSchema)