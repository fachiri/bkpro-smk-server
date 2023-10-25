const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../models')
const { validateResetPassword } = require('../middlewares/validation')

router.patch('/reset-password', validateResetPassword, async (req, res) => {
  try {
    const uuid = req.user.uuid
    const { old_password, new_password } = req.body;

    const user = await db.User.findOne({ where: { uuid } });

    const isPasswordValid = await bcrypt.compare(old_password, user.password);
    if (!isPasswordValid) {
      throw { code: 400, message: 'Password lama tidak valid' }
    }

    const hashedPassword = bcrypt.hashSync(new_password);

    await user.update({
      password: hashedPassword
    });

    res.status(200).json({
      success: true,
      message: 'Password berhasil direset',
      data: {}
    })
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

module.exports = router
