module.exports = (sequelize, Sequelize) => {
  const Counseling = sequelize.define("counselings", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.CHAR(10),
      allowNull: false,
      defaultValue: "PENDING"
    }
  })

  return Counseling;
}