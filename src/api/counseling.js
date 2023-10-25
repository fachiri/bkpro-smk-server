const express = require('express')
const router = express.Router()

const db = require('../models')
const { getUserIdbyUuid } = require('../utils/model.util')
const { validateCreateCounseling } = require('../middlewares/validation')

router.get('/', async (req, res) => {
  try {
    const data = await db.Counseling.findAll({
      where: {
        userId: await getUserIdbyUuid(req.user.uuid)
      },
      attributes: { exclude: ['id'] },
      order: [
        ['createdAt', 'DESC']
      ]
    })

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan',
      data
    })
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

router.get('/:uuid', async (req, res) => {
  try {
    const data = await db.Counseling.findOne({
      where: {
        uuid: req.params.uuid,
        userId: await getUserIdbyUuid(req.user.uuid)
      },
      attributes: { exclude: ['id'] },
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

router.post('/', validateCreateCounseling, async (req, res) => {
  try {
    const { subject, content } = req.body
    const userId = await getUserIdbyUuid(req.user.uuid)

    const data = await db.Counseling.create({
      subject, content,
      userId
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
})

module.exports = router
