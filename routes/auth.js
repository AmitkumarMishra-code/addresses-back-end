const express = require('express')
const { addToken } = require('../controllers/tokenController')
const { addNewUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', async(req, res) => {
    const { username, email, password } = req.body
    let response = await addNewUser(username, email, password)
    if (response.status) {
        res.status(200).send(response.message)
    } else {
        res.status(400).send(response.message)
    }
})

router.post('/login', async(req, res) => {
    const { email, password } = req.body
    let response = await loginUser(email, password)
    if (response.status) {
        let payload = {
            email
        }
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
        await addToken(refreshToken, email)
        res.status(200).json({ access_Token: token, refresh_Token: refreshToken })
    } else {
        res.status(400).send(response.message)
    }

})

module.exports = router;