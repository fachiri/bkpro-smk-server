const express = require('express')
const router = express.Router()

const db = require('../models')

router.get('/', async (req, res) => {
  try {
    const majors = await db.Major.findAll({
      attributes: ['id', 'code', 'major']
    })

    res.status(200).json({
      success: true,
      message: 'Data found',
      data: majors
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while retrieving data',
      error: error.message
    })
  }
})

module.exports = router
