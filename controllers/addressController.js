const mongoose = require('mongoose')

const Address = require('../models/address')
const User = require('../models/users')

const addAddress = async({ city, state, country, addressLine1, addressLine2, pincode, label }, email) => {
    let user = await User.findOne({ email })
    if (!user) {
        return { status: false, message: 'invalid User' }
    } else {
        let address = {
            city,
            state,
            country,
            addressLine1,
            pincode: Number(pincode),
            label,
            user: user._id
        }
        if (addressLine2) {
            address.addressLine2 = addressLine2
        }
        let newAddress = new Address(address)
        await newAddress.save()
        return { status: true, message: "Address added successfully" }
    }
}

const deleteAddress = async(id) => {
    addressToDelete = Address.findOne({ _id: id })
    if (addressToDelete) {
        await addressToDelete.remove()
        return { status: true, message: 'Address Deleted Successfully' }
    } else {
        return { status: false, message: 'Address not found' }
    }
}

const updateAddress = async(id, updates) => {
    addressToUpdate = Address.findOne({ _id: id })
    if (addressToUpdate) {
        addressToUpdate.overwrite(updates)
        await addressToUpdate.save()
        return { status: true, message: 'Address Updated Successfully' }
    } else {
        return { status: false, message: 'Address not found' }
    }
}

const printAllAddresses = async(email) => {
    let user = await User.findOne({ email })
    if (user) {
        let allAddresses = await Address.find({ user: user._id })
        if (allAddresses.length) {
            return { status: true, message: allAddresses }
        } else {
            return { status: false, message: 'No addresses found' }
        }
    } else {
        return { status: false, message: 'invalid User' }
    }
}

const searchAddresses = async(query) => {
    let citySearch = Address.find({ city: query })
    if (citySearch.length) {
        return { status: true, message: citySearch }
    }
    let pincodeSearch = Address.find({ pincode: query })
    if (pincodeSearch.length) {
        return { status: true, message: pincodeSearch }
    }
    let stateSearch = Address.find({ state: query })
    if (stateSearch.length) {
        return { status: true, message: stateSearch }
    }
    return { status: false, message: 'no address found' }
}

module.exports = {
    addAddress,
    deleteAddress,
    updateAddress,
    printAllAddresses,
    searchAddresses
}

// city, pincode, state, country, addressLine1, addressLine2, label