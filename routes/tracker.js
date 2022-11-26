const express = require('express')
const router = express.Router()
const trackerController = require('../controllers/tracker')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, trackerController.getUser)

router.post('/addDivId', trackerController.addDivId)

router.post('/removeDivId', trackerController.removeDivId)

module.exports = router