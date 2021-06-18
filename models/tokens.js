const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true })

const TokenModel = mongoose.model('token', TokenSchema)

module.exports = TokenModel