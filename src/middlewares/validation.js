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
        throw { code: 400, message: 'File materi harus diisi' }
      }

      await schema.validateAsync({ ...req.body, ...{ size: req.file.size } })

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
  },
  validateCreateCounseling: async (req, res, next) => {
    try {
      const schema = Joi.object({
        subject: Joi.string().required().messages({
          'string.empty': 'Subjek konseling harus diisi'
        }),
        content: Joi.string().required().messages({
          'string.empty': 'Isian konseling harus diisi'
        })
      });

      const { subject, content } = req.body

      await schema.validateAsync({ subject, content })

      next()
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      })
    }
  },
  validateResetPassword: async (req, res, next) => {
    try {
      const schema = Joi.object({
        old_password: Joi.string().required().messages({
          'string.empty': 'Password lama harus diisi',
        }),
        new_password: Joi.string().min(6).required().messages({
          'string.min': 'Password baru harus memiliki setidaknya {#limit} karakter',
          'string.empty': 'Password baru harus diisi'
        }),
        repeat_password: Joi.any().valid(Joi.ref('new_password')).required().messages({
          'any.only': 'Konfirmasi password harus sama dengan password baru',
          'any.required': 'Konfirmasi password harus diisi'
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
  validateStoreUser: async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required().messages({
          'string.empty': 'Nama harus diisi'
        }),
        role: Joi.string().required().messages({
          'string.empty': 'Role harus diisi'
        }),
        master_number: Joi.string().required().messages({
          'string.empty': 'Nomor induk harus diisi'
        }),
        password: Joi.string().allow(null, ''),
        major: Joi.string().allow(null, ''),
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
  validateImportUser: async (req, res, next) => {
    try {
      const schema = Joi.object({
        major: Joi.string().required().messages({
          'string.empty': 'Pilih Jurusan',
          'any.required': 'Pilih Jurusan'
        }),
        file: Joi.any().required().messages({
          'any.required': 'Pilih File'
        })
      });
      await schema.validateAsync({
        major: req.body.major,
        file: req.file
      })
      next()
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      })
    }
  },
  validateLogin: async (req, res, next) => {
    try {
      const schema = Joi.object({
        role: Joi.string().required().messages({
          'string.empty': 'Pilih role'
        }),
        masterNumber: Joi.string().required().messages({
          'string.empty': 'Username harus diisi'
        }),
        password: Joi.string().required().messages({
          'string.empty': 'Password harus diisi'
        }),
        remember: Joi.boolean()
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
  validateCreateProfession: async (req, res, next) => {
    try {
      const schema = Joi.object({
        code: Joi.string().required().messages({
          'string.empty': 'Kode profesi harus diisi'
        }),
        profession: Joi.string().required().messages({
          'string.empty': 'Nama profesi harus diisi'
        }),
        size: Joi.number().max(25 * 1024 * 1024).allow(null).messages({
          'number.max': 'Ukuran file maksimal 25 MB'
        })
      });

      const { size } = req.file || {}
      const { code, profession } = req.body

      await schema.validateAsync({size, code, profession})

      next()
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      })
    }
  },
}