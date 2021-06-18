require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRouter = require('./routes/auth')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use('/auth', authRouter)

app.all(/.*/, (req, res) => {
    res.status(404).json({ response: 'Invalid endpoint. Please contact the admin.' })
})

app.listen(3300, () => console.log('Server is running on http://localhost:3300/'))