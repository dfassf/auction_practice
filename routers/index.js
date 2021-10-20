const express = require('express')
const router = express.Router()
const mainRouter = require('./main/index')

router.use('/', mainRouter)

module.exports = router