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

router.get('/:uuid', async (req, res) => {
  try {
    const data = await db.Material.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if (!data) {
      throw { code: 404, message: 'Data tidak ditemukan' }
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    data.file = `${baseUrl}/uploads/materi/${data.file}`

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
