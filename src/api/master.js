const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const db = require('../models/index.js')
const { majorCreate } = require('../middlewares/validation.js')
const { randomFilename } = require('../utils/generate.util.js')

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

router.post('/majors', majorCreate, async (req, res) => {
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

router.delete('/majors/:uuid', async (req, res) => {
  try {
    const major = await db.Major.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if (!major) {
      throw { code: 404, message: 'Data jurusan tidak ditemukan' }
    }

    major.destroy()

    res.status(200).json({
      success: true,
      message: 'Data berhasil dihapus',
      data: {}
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

router.get('/majors/:uuid', async (req, res) => {
  try {
    const major = await db.Major.findOne({
      where: {
        uuid: req.params.uuid
      },
      attributes: {
        exclude: ['id']
      },
      include: {
        model: db.Profession,
        attributes: {
          exclude: ['id', 'majorId']
        },
      }
    })

    if (!major) {
      throw { code: 404, message: 'Data jurusan tidak ditemukan' }
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan',
      data: major
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

// professions

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
router.get('/professions/:uuid', async (req, res) => {
  try {
    const profession = await db.Profession.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if (!profession) {
      throw { code: 404, message: 'Data profesi tidak ditemukan' }
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan',
      data: profession
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
router.put('/professions/:uuid',
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads/profesi/'))
      },
      filename: function (req, file, cb) {
        cb(null, randomFilename(file.originalname))
      }
    })
  })
    .single('file'),
  async (req, res) => {
    try {
      const { filename } = req.file || {}
      const affectedRows = await db.Profession.update(
        { ...req.body, ...{ file: filename} },
        {
          where: {
            uuid: req.params.uuid
          }
        }
      )

      if (affectedRows == 0) {
        throw { message: 'Gagal mengedit data' }
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