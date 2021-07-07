const mongoose = require('mongoose')
const Schema = mongoose.Schema
const modelType = {
    type: String,
    required: true,
    lowercase: true
}
const agentSchema = new Schema({
    names: modelType,
    email: modelType,
    phone: {
        type: String
    },
    function: {
        type: Schema.Types.ObjectId,
        ref: 'Functions'
    }
}, { timetamps: true })

module.exports = mongoose.model('Agents', agentSchema)