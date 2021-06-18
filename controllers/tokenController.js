const mongoose = require('mongoose')

const Token = require('../models/tokens')

const addToken = async(token, email) => {
    let newtoken = new Token({ token, email })
    let addedToken = await newtoken.save()
    return { status: true, message: 'added' }
}

module.exports = {
    addToken
}