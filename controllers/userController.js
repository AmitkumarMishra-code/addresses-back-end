const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/users')

const addNewUser = async(username, email, password) => {
    if (!username.length) {
        return { status: false, message: 'Username cannot be empty' }
    }
    if (!email.length) {
        return { status: false, message: 'Email cannot be empty' }
    }
    if (!password.length) {
        return { status: false, message: 'Password cannot be empty' }
    }
    if (!(/.*@.*\..*/.test(email))) {
        return { status: false, message: 'Invalid Email' }
    }

    let hashedPassword = bcrypt.hash(password, 10)
    let newUser = new User({ name: username, email, password })
    let user = await newUser.save()
    return { status: true, message: `New account created with email id: ${email}` }
}

const loginUser = (email, password) => {
    if (!email.length) {
        return { status: false, message: 'Email cannot be empty' }
    }
    if (!password.length) {
        return { status: false, message: 'Password cannot be empty' }
    }
    if (!(/.*@.*\..*/.test(email))) {
        return { status: false, message: 'Invalid Email' }
    }
    let user = User.findOne({ email: email })
    console.log(user)
    if (!user) {
        return { status: false, message: 'User not found' }
    } else {
        let result = bcrypt.compare(password, user.password)
        if (!result) {
            return { status: false, message: 'Invalid Password' }
        } else {
            return { status: true, message: 'Login Successful' }
        }
    }
}

module.exports = {
    addNewUser,
    loginUser
}