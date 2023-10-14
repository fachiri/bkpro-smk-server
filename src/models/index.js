const Sequelize = require("sequelize")
const config = require('./../config/keys').db
const sequelize = new Sequelize(
  config.name,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Competency = require("./competency.model.js")(sequelize, Sequelize)
db.Profession = require("./profession.model.js")(sequelize, Sequelize)
db.Major = require("./major.model.js")(sequelize, Sequelize)
db.User = require("./user.model.js")(sequelize, Sequelize)
db.Material = require("./material.model.js")(sequelize, Sequelize)

db.Major.hasMany(db.Profession)
db.Profession.belongsTo(db.Major)
db.Profession.belongsToMany(db.Competency, { through: 'ProfessionCompetency' })
db.Competency.belongsToMany(db.Profession, { through: 'ProfessionCompetency' })
db.User.belongsTo(db.Major)

module.exports = db