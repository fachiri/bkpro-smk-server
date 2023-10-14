module.exports = (sequelize, Sequelize) => {
  const Material = sequelize.define("materials", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    desc: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    file: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  })

  return Material;
}