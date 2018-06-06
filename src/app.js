require('dotenv').config()
require('./libs/decorators/expressRouteDecorator')

const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const jwt = require('./middlewares/jwt')

const app = express()

app.disable('x-powered-by')

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(jwt.guard)
app.use('/public', express.static(`${__dirname}/../public`))

app.use(errorHandler)

module.exports = app
