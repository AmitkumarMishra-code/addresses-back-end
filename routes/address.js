const express = require('express')
const { printAllAddresses, addAddress, deleteAddress, updateAddress, searchAddresses } = require('../controllers/addressController')
const router = express.Router()

router.get('/all', async(req, res) => {
    let response = await printAllAddresses(req._addedEmail)
    if (response.status) {
        res.status(200).json(response.message)
    } else {
        res.status(403).send(response.message)
    }
})

router.post('/add', async(req, res) => {
    let response = await addAddress(req.body, req._addedEmail)
    if (response.status) {
        res.status(200).send(response.message)
    } else {
        res.status(403).send(response.message)
    }
})

router.delete('/:id', async(req, res) => {
    let id = req.params.id
    let response = await deleteAddress(id)
    if (response.status) {
        res.status(200).send(response.message)
    } else {
        res.status(403).send(response.message)
    }
})


router.put('/:id', async(req, res) => {
    let id = req.params.id
    let response = await updateAddress(id, req.body)
    if (response.status) {
        res.status(200).send(response.message)
    } else {
        res.status(403).send(response.message)
    }
})


router.post('/:query', async(req, res) => {
    let query = req.params.query
    console.log(query)
    let response = await searchAddresses(query, req._addedEmail)
    if (response.status) {
        res.status(200).json(response.message)
    } else {
        res.status(403).send(response.message)
    }
})

module.exports = router