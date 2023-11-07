const express = require('express')
const router = express.Router()

const db = require('../models')
const { getUserIdbyUuid } = require('../utils/model.util')

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
    res.status(error.code || 500).json({
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
      },
      attributes: { exclude: ['id'] },
      include: db.Chat
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
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

router.post('/:uuid', async (req, res) => {
  try {
    if (req.body.chat == '') {
      throw {code: 400, message: 'Tulis pesan!'}
    }

    const counseling = await db.Counseling.findOne({ where: { uuid: req.params.uuid } })

    const data = await db.Chat.create({
      chat: req.body.chat,
      userId: await getUserIdbyUuid(req.user.uuid),
      counselingId: counseling.id
    })

    res.status(200).json({
      success: true,
      message: 'Pesan berhasil dikirim',
      data
    })
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

module.exports = router
