const Location = require('../models/location-model')
const { validationResult } = require('express-validator')
const axios = require('axios')

module.exports.find = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const address = req.query.address
        const findAddress = await Location.findOne({ address: address })
        if (!findAddress) {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`)
            const responseObj = {
                place_id: response.data.results[0].place_id,
                location: {
                    lat: response.data.results[0].geometry.location.lat,
                    lng: response.data.results[0].geometry.location.lng
                },
                formatted_address: response.data.results[0].formatted_address,
                address: address
            }
            const newAddress = await Location.create(responseObj)
            return res.status(201).json(newAddress)
        }
        else {
            res.status(200).json(findAddress)
        }
    } catch (err) {
        console.log(err)
        res.status(400).json("Something went wrong")
    }
}
