const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const bcrypt = require('bcryptjs')

const db = require('../models/index.js')
const { majorCreate, validateStoreMaterial, validateUpdateMaterial } = require('../middlewares/validation.js')
const { randomFilename, createSlug } = require('../utils/generate.util.js');
const keys = require('../config/keys.js');

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
        { ...req.body, ...{ file: filename } },
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
  }
)

// materials
router.post('/materials',
  [
    multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '../../public/uploads/materi/'))
        },
        filename: function (req, file, cb) {
          cb(null, randomFilename(file.originalname))
        }
      })
    })
      .single('file'),
    validateStoreMaterial
  ],
  async (req, res) => {
    try {
      const { filename } = req.file || {}

      if (!filename) {
        throw { code: 400, message: 'Gagal mengupload file' }
      }

      const data = await db.Material.create({
        title: req.body.title,
        slug: createSlug(req.body.title),
        desc: req.body.desc,
        file: filename
      })

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
  }
)
router.get('/materials', async (req, res) => {
  try {
    const data = await db.Material.findAll({
      attributes: { exclude: ['id'] },
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
router.get('/materials/:uuid', async (req, res) => {
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
router.put('/materials/:uuid',
  [
    multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '../../public/uploads/materi/'))
        },
        filename: function (req, file, cb) {
          cb(null, randomFilename(file.originalname))
        }
      })
    })
      .single('file'),
    validateUpdateMaterial
  ],
  async (req, res) => {
    try {
      const { filename } = req.file || {}
      const data = await db.Material.findOne({
        where: {
          uuid: req.params.uuid
        }
      })

      if (!data) {
        throw { message: 'Data tidak ditemukan' }
      }

      if (filename) {
        const filePath = `${keys.path.upload.materi}${data.file}`
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      data.update(
        { ...req.body, ...{ file: filename } },
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
  }
)
router.delete('/materials/:uuid', async (req, res) => {
  try {
    const data = await db.Material.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if (!data) {
      throw { code: 404, message: 'Data tidak ditemukan' }
    }

    const filePath = `${keys.path.upload.materi}${data.file}`
    await fs.access(filePath, fs.constants.F_OK);
    await fs.unlink(filePath);

    data.destroy()

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

// users
router.post('/users', async (req, res) => {
  try {
    const { name, role, master_number, password } = req.body

    const data = await db.User.create({
      name,
      role,
      master_number,
      password: bcrypt.hashSync(password.length === 0 ? master_number : password)
    })

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
}
)
router.get('/users', async (req, res) => {
  try {
    const data = await db.User.findAll({
      attributes: { exclude: ['id'] },
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
router.get('/users/:uuid', async (req, res) => {
  try {
    const data = await db.User.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if (!data) {
      throw { code: 404, message: 'Data tidak ditemukan' }
    }

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
router.put('/users/:uuid', async (req, res) => {
  try {
    const data = await db.User.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if (!data) {
      throw { message: 'Data tidak ditemukan' }
    }

    data.update(req.body)

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
router.delete('/users/:uuid', async (req, res) => {
  try {
    const data = await db.User.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if (!data) {
      throw { code: 404, message: 'Data tidak ditemukan' }
    }

    if (data.role == 'ADMIN') {
      throw { code: 404, message: 'Data admin tidak bisa dihapus' }
    }

    data.destroy()

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

module.exports = router