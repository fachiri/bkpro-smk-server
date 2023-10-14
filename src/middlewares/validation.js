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
  },
  validateStoreMaterial: async (req, res, next) => {
    try {
      const schema = Joi.object({
        title: Joi.string().required().messages({
          'string.empty': 'Judul materi harus diisi'
        }),
        desc: Joi.string().required().messages({
          'string.empty': 'Deskripsi materi harus diisi'
        }),
        size: Joi.number().max(25 * 1024 * 1024).required().messages({
          'number.max': 'Ukuran file maksimal 25 MB',
          'number.empty': 'File materi harus diisi'
        })
      });

      if (!req.file) {
        throw {code: 400, message: 'File materi harus diisi'}
      }
      
      await schema.validateAsync({...req.body, ...{size: req.file.size}})

      next()
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      })
    }
  },
  validateUpdateMaterial: async (req, res, next) => {
    try {
      const schema = Joi.object({
        title: Joi.string().required().messages({
          'string.empty': 'Judul materi harus diisi'
        }),
        desc: Joi.string().required().messages({
          'string.empty': 'Deskripsi materi harus diisi'
        }),
        size: Joi.number().max(25 * 1024 * 1024).allow(null).messages({
          'number.max': 'Ukuran file maksimal 25 MB'
        })
      });

      const { size } = req.file || {}
      const { title, desc } = req.body
      
      await schema.validateAsync({ title, desc, size })
      
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