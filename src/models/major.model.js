module.exports = (sequelize, Sequelize) => {
  const Major = sequelize.define("majors", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    major: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  })

  return Major;
}