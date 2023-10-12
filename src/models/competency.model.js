module.exports = (sequelize, Sequelize) => {
  const Competency = sequelize.define("competencies", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    competency: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  })

  return Competency;
}