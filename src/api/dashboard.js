const express = require('express')
const router = express.Router()

const db = require('../models')
const { getUserIdbyUuid } = require('../utils/model.util')

router.get('/siswa/:uuid', async (req, res) => {
  try {
    const tests = await db.Test.findAll({
      where: {
        userId: await getUserIdbyUuid(req.user.uuid)
      }
    })

    const counselings = await db.Counseling.findAll({
      where: {
        userId: await getUserIdbyUuid(req.user.uuid)
      }
    })

    const testsCount = tests.length;
    const counselingsCount = counselings.length;
    const pendingCounselings = counselings.filter(counseling => counseling.status === 'PENDING');
    const pendingCounselingsCount = pendingCounselings.length;
    const processCounselings = counselings.filter(counseling => counseling.status === 'BERLANGSUNG');
    const processCounselingsCount = processCounselings.length;
    const completedCounselings = counselings.filter(counseling => counseling.status === 'SELESAI');
    const completedCounselingsCount = completedCounselings.length;

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan',
      data: {
        testsCount,
        counselingsCount,
        pendingCounselingsCount,
        processCounselingsCount,
        completedCounselingsCount
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

router.get('/guru', async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: {
        role: 'SISWA'
      }
    })
    const counselings = await db.Counseling.findAll()
    const materials = await db.Material.findAll()

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan',
      data: {
        users,
        counselings,
        materials
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

router.get('/admin', async (req, res) => {
  try {
    const majors = await db.Major.findAll()
    const materials = await db.Material.findAll()
    const users = await db.User.findAll()

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan',
      data: {
        majors,
        materials,
        users,
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

module.exports = router
