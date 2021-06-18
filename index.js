require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRouter = require('./routes/auth')
const addressRouter = require('./routes/address')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use('/auth', authRouter)

let validateToken = (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1]
    try {
        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req._addedEmail = decoded.email
        next()
    } catch (error) {
        res.status(403).json({ message: 'Invalid access token, ' + error.message })
    }
}

app.use('/address', validateToken, addressRouter)

app.all(/.*/, (req, res) => {
    res.status(404).json({ response: 'Invalid endpoint. Please contact the admin.' })
})

app.listen(3300, () => console.log('Server is running on http://localhost:3300/'))