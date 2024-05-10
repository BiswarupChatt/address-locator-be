require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const configureDB = require('./config/db')
const locationCtrl = require('./app/controllers/location-ctrl')
const locationValidation = require('./app/validations/location-validation')
const { checkSchema } = require('express-validator')
const app = express()
const port = process.env.PORT

configureDB()

app.use(express.json())
app.use(morgan('common'))
app.use(cors())

app.get('/find', checkSchema(locationValidation), locationCtrl.find)

app.listen(port, () => {
    console.log(`Server is successfully running on this url http://localhost:${port}`)
})