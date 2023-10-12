const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

const { verifyToken } = require('../middlewares/auth.js')
const { secret } = require('../config/keys.js')
const db = require('../models/index.js')

router.get('/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params

    const user = await db.User.findOne({
      where: {
        uuid
      },
      attributes: {
        exclude: ['id','password', 'remember_token', 'majorId']
      },
      include: {
        model: db.Major,
        attributes: {
          exclude: ['id']
        }
      }
    })

    res.status(200).json({
      success: true,
      message: 'Data ditemukan',
      data: user
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

module.exports = router