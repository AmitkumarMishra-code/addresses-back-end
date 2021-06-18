const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
    },
    label: {
        type: String,
        required: true
    }
}, { timestamps: true })

const AddressModel = mongoose.model('address', AddressSchema)

module.exports = AddressModel




// city, pincode, state, country, addressLine1, addressLine2, label