module.exports = (sequelize, Sequelize) => {
  const Profession = sequelize.define("professions", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.CHAR(2),
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    desc: {
      type: Sequelize.TEXT,
      allowNull: true,
    }
  })

  return Profession;
}