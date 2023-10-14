const express = require('express')
const question = require('./question')
const answer = require('./answer')
const majors = require('./majors')
const professions = require('./professions')
const auth = require('./auth')
const user = require('./user')
const master = require('./master')
const materials = require('./materials')

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/question', question)
router.use('/answer', answer)
router.use('/majors', majors)
router.use('/professions', professions)
router.use('/master', master)
router.use('/materials', materials)

module.exports = router
