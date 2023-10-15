const db = require('../models');

const modelUtils = {
  getCompetenciesByMajor: async (majorId, codes) => {
    const competencies = []
    const professions = await db.Profession.findAll({
      where: {
        majorId
      },
      attributes: ['code', 'profession'],
      include: {
        model: db.Competency,
        attributes: ['code', 'competency'],
        where: {
          code: codes
        }
      }
    })

    professions.forEach(profession => {
      profession.competencies.forEach(competency => {
        const existingCompetency = competencies.find(e => e.code === competency.code);

        if (!existingCompetency) {
          competencies.push({
            code: competency.code,
            competency: competency.competency
          });
        }
      })
    });

    return competencies
  },
  getRedirect: (role) => {
    switch (role) {
      case 'ADMIN':
        return '/admin/dasbor'

      case 'SISWA':
        return '/dasbor'

      case 'GURU':
        return '/guru/dasbor'

      default:
        throw { code: 400, message: 'Role tidak valid' }
    }
  },
  getUserIdbyUuid: async (uuid) => {
    const user = await db.User.findOne({
      where: {
        uuid
      }
    })

    return user.id
  }
}

module.exports = modelUtils