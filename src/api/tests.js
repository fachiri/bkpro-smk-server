const express = require('express')
const router = express.Router()

const db = require('../models')
const { getUserIdbyUuid } = require('../utils/model.util')

router.get('/', async (req, res) => {
  try {
    const data = await db.Test.findAll({
      where: {
        userId: await getUserIdbyUuid(req.user.uuid)
      },
      attributes: { exclude: ['id'] },
      include: {
        model: db.TestFacts,
        attributes: { exclude: ['id'] }
      },
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
    res.status(500).json({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

router.get('/:uuid', async (req, res) => {
  try {
    const data = await db.Test.findOne({
      where: {
        uuid: req.params.uuid,
        userId: await getUserIdbyUuid(req.user.uuid)
      },
      attributes: { exclude: ['id', 'userId'] },
      include: [
        {
          model: db.TestFacts,
          attributes: { exclude: ['id'] }
        },
        {
          model: db.User,
          attributes: ['majorId'],
          include: {
            model: db.Major,
            attributes: ['code'],
          }
        }
      ]
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

router.post('/', async (req, res) => {
  try {
    const { facts } = req.body

    const data = await db.Test.create({
      userId: await getUserIdbyUuid(req.user.uuid)
    })

    for (const key in facts) {
      await db.TestFacts.create({
        testId: data.id,
        code: key,
        value: facts[key]
      })
    }

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
