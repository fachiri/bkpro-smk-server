const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

const { verifyToken } = require('./../middlewares/auth.js')
const { secret } = require('./../config/keys')
const db = require('../models')

router.post('/login', async (req, res) => {
  try {
    const { role, masterNumber, password, remember } = req.body

    const user = await db.User.findOne({
      where: {
        role,
        master_number: masterNumber
      }
    })

    if (!user) {
      throw { code: 401, message: 'Nomor induk atau password salah.' }
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw { code: 401, message: 'Nomor induk atau password salah.' }
    }

    const tokenJwt = jwt.sign(
      { 
        role,
        uuid: user.uuid,
        masterNumber: user.masterNumber
      },
      secret, 
      { expiresIn: '1h' }
    )

    res.status(200).json({
      success: true,
      message: 'Login berhasil.',
      data: {
        user: {
          role,
          uuid: user.uuid,
          username: user.username
        },
        token: tokenJwt
      }
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

router.get('/verify-token/:role', verifyToken, async (req, res) => { 
  try {
    const { role } = req.params

    if (role !== req.user.role) {
      throw {code: 401, message: 'Akses tidak sah.'}
    }

    res.status(200).send({
      success: true,
      message: 'Akses berhasil.',
      data: {}
    })
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: {}
    });
  }
})

module.exports = router