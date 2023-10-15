module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("tests", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    }
  })

  return Test;
}