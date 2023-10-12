const express = require('express')
const router = express.Router()

const db = require('../models')

router.get('/:code/detail', async (req, res) => {
  try {
    const profession = await db.Profession.findOne({
      attributes: { exclude: ['id', 'majorId'] },
      where: {
        code: req.params.code
      },
      include: {
        model: db.Major,
        attributes: { exclude: ['id'] }
      }
    })

    if (!profession) {
      throw {message: 'Data tidak ditemukan'}
    }

    res.status(200).json({
      success: true,
      message: 'Data ditemukan',
      data: profession
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router
