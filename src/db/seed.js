const db = require('./../models')
const bcrypt = require('bcryptjs')

const createProfessionCompetency = (professionId, competencyId) => {
  db.sequelize.models.ProfessionCompetency.findOrCreate({
    where: {
      professionId,
      competencyId,
    }
  })
}

try {
  db.Major.findOrCreate({
    where: { code: 'M1' },
    defaults: { major: 'TKJ' }
  }).then(([major]) => {
    db.Profession.findOrCreate({
      where: { code: 'P1' },
      defaults: {
        profession: 'Network Engineer',
        majorId: major.id
      }
    }).then(([profession]) => {
      db.Competency.findOrCreate({
        where: { code: 'KT1' },
        defaults: {
          competency: 'Saya senang mempelajari sistem dan prosedur instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT2' },
        defaults: {
          competency: 'Saya memahami standar mutu instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT3' },
        defaults: {
          competency: 'Saya mengetahui faktor resiko dalam melakukan instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KM1' },
        defaults: {
          competency: 'Saya mampu memimpin'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KM2' },
        defaults: {
          competency: 'Saya mampu melakukan koordinasi'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS1' },
        defaults: {
          competency: 'Saya mampu bekerjasama dan bersosialisasi'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS2' },
        defaults: {
          competency: 'Saya mampu berkomunikasi'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS3' },
        defaults: {
          competency: 'Saya memiliki fokus kerja dan berorientasi pada hasil kerja'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
    })

    db.Profession.findOrCreate({
      where: { code: 'P2' },
      defaults: {
        profession: 'Maintenance Engineer',
        majorId: major.id
      }
    }).then(([profession]) => {
      db.Competency.findOrCreate({
        where: { code: 'KT1' },
        defaults: {
          competency: 'Saya senang mempelajari sistem dan prosedur instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT2' },
        defaults: {
          competency: 'Saya memahami standar mutu instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT3' },
        defaults: {
          competency: 'Saya mengetahui faktor resiko dalam melakukan instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT4' },
        defaults: {
          competency: 'Saya senang mempelajari sistem dan prosedur pemeliharaan dan perbaikan instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KM1' },
        defaults: {
          competency: 'Saya mampu memimpin'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KM2' },
        defaults: {
          competency: 'Saya mampu melakukan koordinasi'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS1' },
        defaults: {
          competency: 'Saya mampu bekerjasama dan bersosialisasi'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS2' },
        defaults: {
          competency: 'Saya mampu berkomunikasi'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS3' },
        defaults: {
          competency: 'Saya memiliki fokus kerja dan berorientasi pada hasil kerja'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
    })

    db.Profession.findOrCreate({
      where: { code: 'P3' },
      defaults: {
        profession: 'Network Designer',
        majorId: major.id
      }
    }).then(([profession]) => {
      db.Competency.findOrCreate({
        where: { code: 'KT5' },
        defaults: {
          competency: 'Saya memahami sistem dan prosedur desain instalasi jaringan dan infrastruktur '
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT6' },
        defaults: {
          competency: 'Saya memahami standar mutu desain instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT7' },
        defaults: {
          competency: 'Saya mengetahui faktor resiko dalam mendesain instalasi jaringan dan infrastruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS1' },
        defaults: {
          competency: 'Saya mampu bekerjasama dan bersosialisasi'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS2' },
        defaults: {
          competency: 'Saya mampu berkomunikasi'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KS3' },
        defaults: {
          competency: 'Saya memiliki fokus kerja dan berorientasi pada hasil kerja'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
    })

    db.Profession.findOrCreate({
      where: { code: 'P4' },
      defaults: {
        profession: 'Technical Support',
        majorId: major.id
      }
    }).then(([profession]) => {
      db.Competency.findOrCreate({
        where: { code: 'KT8' },
        defaults: {
          competency: 'Saya senang mempelajari sistem dan prosedur instalasi jaringan keras'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT9' },
        defaults: {
          competency: 'Saya memahami standar mutu instalasi jaringan keras'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT10' },
        defaults: {
          competency: 'Saya mengetahui faktor resiko dalam melakukan instalasi jaringan keras'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT11' },
        defaults: {
          competency: 'Saya memahami standar kesehatan dan keselamatan kerja'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
    })

    db.Profession.findOrCreate({
      where: { code: 'P5' },
      defaults: {
        profession: 'Network Support Technician',
        majorId: major.id
      }
    }).then(([profession]) => {
      db.Competency.findOrCreate({
        where: { code: 'KT12' },
        defaults: {
          competency: 'Saya senang mempelajari tentang struktur data'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT13' },
        defaults: {
          competency: 'Saya memahami tentang user interface'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT14' },
        defaults: {
          competency: 'Saya mampu menggunakan spesifikasi program'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT15' },
        defaults: {
          competency: 'Saya mampu menerapkan perintah eksekusi bahasa pemrograman berbasis teks, grafik, dan multimedia'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT16' },
        defaults: {
          competency: 'Saya bisa melakukan instalasi software tools pemrograman'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT17' },
        defaults: {
          competency: 'Saya bisa melakukan pengaturan software tools pemrograman'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT18' },
        defaults: {
          competency: 'Saya bisa menulis kode dengan prinsip sesuai guidelines dan best practices'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT19' },
        defaults: {
          competency: 'Saya dapat mengimplementasikan pemrograman terstruktur'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT20' },
        defaults: {
          competency: 'Saya bisa membuat dokumen kode program'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT21' },
        defaults: {
          competency: 'Saya bisa melakukan debugging'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
      db.Competency.findOrCreate({
        where: { code: 'KT22' },
        defaults: {
          competency: 'Saya bisa melaksanakan pengujian unit program'
        }
      }).then(([competency]) => createProfessionCompetency(profession.id, competency.id))
    })
  })

  db.Major.findOrCreate({
    where: { code: 'M2' },
    defaults: { major: 'RPL' }
  })

  db.Major.findOrCreate({
    where: { code: 'M3' },
    defaults: { major: 'MULTIMEDIA' }
  })

  db.User.findOrCreate({
    where: { master_number: '1234567890' },
    defaults: {
      name: 'Admin',
      role: 'ADMIN',
      password: bcrypt.hashSync('admin')
    }
  })

  db.User.findOrCreate({
    where: { master_number: '0987654321' },
    defaults: {
      name: 'Muh. Fachry J.K. Luid',
      role: 'SISWA',
      password: bcrypt.hashSync('pass1234'),
      majorId: 1
    }
  })
} catch (error) {
  console.log('Terjadi kesalahan saat melakukan seed')
  console.log(error)
}