module.exports = (sequelize, Sequelize) => {
  const TestFact = sequelize.define("test_facts", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.CHAR(10),
      allowNull: false
    },
    value: {
      type: Sequelize.INTEGER(1), // menyimpan nilai true atau false
      allowNull: false
    }
  })

  return TestFact;
}