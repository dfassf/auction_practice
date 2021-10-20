const express = require('express')
const router = express.Router()
const controller = require('./main.controller')

router.get('/', controller.main)
router.post('/maindata', controller.mainData)
router.post('/auction', controller.auction)
router.post('/ended', controller.ended)


module.exports = router