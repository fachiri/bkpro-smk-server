const Joi = require("joi");
const db = require('../models/index.js')

module.exports = {
  majorCreate: async (req, res, next) => {
    try {
      const schema = Joi.object({
        code: Joi.string()
          .required()
          .messages({
            'string.empty': 'Kode jurusan harus diisi'
          })
          .external(async (code) => {
            const isCodeInUse = await db.Major.findOne({ where: { code } })
            if (isCodeInUse) {
              throw { code: 400, message: 'Kode jurusan sudah digunakan' };
            }
            return code
          }),
        major: Joi.string().required().messages({
          'string.empty': 'Nama jurusan harus diisi'
        })
      });

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      })
    }
  }
}