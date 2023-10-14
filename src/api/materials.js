const express = require('express')
const router = express.Router()

const db = require('../models')

router.get('/', async (req, res) => {
  try {
    const data = await db.Material.findAll({
      attributes: { exclude: ['id'] }
    })

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    data.map((e) => e.file = `${baseUrl}/uploads/materi/${e.file}`)

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan',
      data
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
