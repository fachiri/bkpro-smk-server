const express = require('express')
const router = express.Router()

const db = require('../models/index.js')

router.get('/majors', async (req, res) => {
  try {
    const data = await db.Major.findAll({
      attributes: {
        exclude: ['id']
      }
    })

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

router.post('/majors', async (req, res) => {
  try {
    const data = await db.Major.create(req.body)

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditambahkan',
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

router.put('/majors/:uuid', async (req, res) => {
  try {
    await db.Major.update(
      { ...req.body },
      {
        where: {
          uuid: req.params.uuid
        }
      }
    )

    res.status(200).json({
      success: true,
      message: 'Data berhasil diedit',
      data: req.body
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

router.get('/professions', async (req, res) => {
  try {
    const data = await db.Profession.findAll({
      attributes: { exclude: ['id', 'majorId'] },
      include: {
        model: db.Major,
        attributes: { exclude: ['id'] }
      }
    })

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

router.put('/professions/:uuid', async (req, res) => {
  try {
    const affectedRows = await db.Profession.update(
      { ...req.body },
      {
        where: {
          uuid: req.params.uuid
        }
      }
    )
    
    if (affectedRows == 0) {
      throw {message: 'Gagal mengedit data'} 
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil diedit',
      data: req.body
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